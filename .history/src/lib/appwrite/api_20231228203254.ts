import { ID, Query } from "appwrite";
import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { IUpdatePost, INewPost, INewUser, IUpdateUser } from "@/types";
import { v4 as uuidv4 } from "uuid";

export async function createUserAccount(user: INewUser) {
  try {
    // Create a new account
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) {
      throw new Error("Account creation failed");
    }

    // Create avatar URL
    const avatarUrl = avatars.getInitials(user.name);

    // Save the new user to the database
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    if (!newUser) {
      throw new Error("User creation failed");
    }
    return newUser;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { status: "error", message: error.message };
    } else {
      console.log("An unexpected error occurred");
      return { status: "error", message: "An unexpected error occurred" };
    }
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  try {
    const uploadedFile = await uploadFile(post.file[0]);
    if (!uploadedFile) throw Error;

    const fileURl = getFilePreview(uploadedFile.$id);
    if (!fileURl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileURl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }
    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileURl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );
    if (!fileURl) throw Error;
    return fileURl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );
  if (!posts) throw Error;
  return posts;
}

export async function likePost(postId: string, likeArray: string[]) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likeArray,
      }
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(userId: string, postId: string) {
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );
    if (!updatedPost) throw Error;
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    );
    if (!statusCode) throw Error;
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId: string) {
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );
    return post;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw Error;

      const fileURl = getFilePreview(uploadedFile.$id);
      if (!fileURl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageUrl: fileURl, imageId: uploadedFile.$id };
    }

    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      throw Error;
    }
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost(postId?: string, imageId?: string) {
  if (!postId || !imageId) throw Error;
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    );
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPosts(userId?: string) {
  if (!userId) return;
  try {
    const post = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );
    if (!post) throw Error;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );
    if (!posts) throw Error;
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPosts(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(limit?: number) {
  const queries: any[] = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries
    );
    if (!users) throw Error;
    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(accountId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      accountId
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUser(user: IUpdateUser) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    if (!updatedUser) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      throw Error;
    }
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }
    return updateUser;
  } catch (error) {
    console.log(error);
  }
}

export const isEmailRegistered = async (email: string) => {
  try {
    // Using the userCollectionId from your appwriteConfig
    const collectionId = appwriteConfig.userCollectionId;

    // Ensure collectionId is correct and not null
    if (!collectionId || collectionId.length > 36) {
      throw new Error("Invalid collection ID");
    }

    // Construct the query
    const query = `email=${encodeURIComponent(email)}`;

    // Perform the query
    const result = await databases.listDocuments(collectionId, [query]);
    return result.documents.length > 0;
  } catch (error) {
    console.error('Error checking email registration:', error);
    return false;
  }
};
