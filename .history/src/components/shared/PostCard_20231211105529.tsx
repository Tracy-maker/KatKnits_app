import { Models } from "appwrite";
import React from "react";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
