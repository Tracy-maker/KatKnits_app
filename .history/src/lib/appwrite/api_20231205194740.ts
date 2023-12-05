import { INewUser } from "@/types";
import { account, avatar } from "./config";
import { Avatars, ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;
    const avatarUrl = avatar.getInitials(user.name);
    const newUser = await saveUserToDB();

    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
});
