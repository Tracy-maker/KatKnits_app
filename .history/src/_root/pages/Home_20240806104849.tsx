import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
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
      <div className="home-container flex w-full gap-6">
        <div className="left-content w-1/2 p-4">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Page</h2>
          <p className="body-medium text-light-1">
            Welcome to our travel community! This is a place for travel enthusiasts to share beautiful landscapes and recommendations. Feel free to post about your favorite destinations and tips for fellow travelers.
          </p>
        </div>
        <div className="right-content w-1/2 p-4">
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
