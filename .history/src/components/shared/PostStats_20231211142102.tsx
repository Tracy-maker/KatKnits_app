import { Models } from "appwrite";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  return <div className="flex justify-between items-center z-20"></div>;
};

export default PostStats;
