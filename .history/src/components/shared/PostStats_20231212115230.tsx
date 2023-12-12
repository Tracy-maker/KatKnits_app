import { getCurrentUser } from "@/lib/appwrite/api";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useGetRecentPosts,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { checkIsLiked } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSave } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
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
      {isSavingPost || isDeletingSave ? (
        <Loader />
      ) : (
        <div className="flex gap-2">
          <img
            src={
              isSaved
                ? "https://img.icons8.com/?size=80&id=dWxbDidOXs9r&format=png"
                : "https://img.icons8.com/?size=50&id=MQbD24yFM0I0&format=png"
            }
            alt="save"
            width={35}
            height={35}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default PostStats;
