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
    <div className="flex flex-1 p-4 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="home-info">
          <h2 className="text-2xl font-bold mb-4">Home Page</h2>
          <p className="text-base text-gray-700 mb-4">
            Welcome to our travel community! This is a place for travel enthusiasts to share beautiful landscapes and recommendations. Feel free to post about your favorite destinations and tips for fellow travelers.
          </p>
          {isPostLoading && !posts ? (
            <Loader />
          ) : null}
        </div>
        <div className="home-posts">
          {!isPostLoading && posts ? (
            <ul className="flex flex-col gap-6">
              {posts?.documents.map((post: Models.Document) => (
                <PostCard post={post} key={post.$id} />
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
