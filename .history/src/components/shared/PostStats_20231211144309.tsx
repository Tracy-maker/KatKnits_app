import { Models } from "appwrite";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src="https://img.icons8.com/?size=48&id=SkbzwdwhI2sy&format=png"
          alt="like"
          width={35}
          height={35}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default PostStats;
