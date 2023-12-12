import { Models } from "appwrite";
import { useState, useEffect } from "react";


import { checkIsLiked } from "@/lib/utils";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "../../lib/react-query/queriesAndMutations";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {

  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending:isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending:isDeletingSave } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post?.$id, likesArray });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post?.$id ||''});
    setIsSaved(true);
  };


  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "https://img.icons8.com/?size=80&id=64452&format=png"
              : "https://img.icons8.com/?size=64&id=44018&format=png"
          }
          alt="like"
          width={45}
          height={45}
          onClick={handleLikePost}
          className="cursor-pointer"
        />

        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeletingSave ? (
          <Loader />
        ) : (
          <img
            src={
              isSaved
                ? "https://img.icons8.com/?size=80&id=dWxbDidOXs9r&format=png"
                : "https://img.icons8.com/?size=50&id=MQbD24yFM0I0&format=png"
            }
            alt="save"
            width={35}
            height={35}
            onClick={(e) => handleSavePost(e)}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
