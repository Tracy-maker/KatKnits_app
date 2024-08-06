import { useUserContext } from "@/context/AuthContext";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();

  if (!post.creator) return null;

  return (
    <div className="post-card p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post?.creator?.imageUrl ||
                "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              }
              alt="creator"
              className="rounded-full w-12 h-12"
            />
          </Link>
          <div className="flex flex-col">
            <p className="font-medium text-gray-900">
              {post.creator.name}
            </p>
            <div className="flex items-center gap-2 text-gray-500">
              <p className="text-sm">
                {multiFormatDateString(post.$createdAt)}
              </p>
              <span>-</span>
              <p className="text-sm">
                {post.location}
              </p>
            </div>
          </div>
        </div>
        {user.id === post.creator.$id && (
          <Link to={`/update-post/${post.$id}`}>
            <img
              src="https://img.icons8.com/?size=50&id=FM7OHrqvInFE&format=png"
              alt="edit"
              width={35}
              height={35}
            />
          </Link>
        )}
      </div>
      <Link to={`/posts/${post.$id}`} className="block">
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800">{post.caption}</p>
          <ul className="flex gap-2 mt-2">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-gray-500">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={
            post.imageUrl ||
            "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          }
          className="w-full h-64 object-cover rounded-lg mb-4"
          alt="post image"
        />
        <div className="post-content mt-4 text-gray-700 leading-relaxed">
          <p>{post.content}</p>
        </div>
      </Link>
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
