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
          width={25}
          height={25}
          onClick={() => {}}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">0</p>
      </div>
      <div className="flex gap-2">
        <img src="" />
      </div>
    </div>
  );
};

export default PostStats;