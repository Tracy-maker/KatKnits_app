import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import {
  useGetRecentPosts,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  if (isErrorPosts) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Page</h2>
          <p className="body-medium text-light-1">
            Welcome to our travel community! This is a place for travel enthusiasts to share beautiful landscapes and recommendations. Feel free to post about your favorite destinations and tips for fellow travelers.
          </p>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col  gap-1 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.caption} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
