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
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <p className="text-lg text-red-600">Something bad happened. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Home Page</h2>
        <p className="text-gray-700 mb-6">
          Welcome to our travel community! This is a place for travel enthusiasts to share beautiful landscapes and recommendations. Feel free to post about your favorite destinations and tips for fellow travelers.
        </p>
        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className="space-y-6">
            {posts?.documents.map((post: Models.Document) => (
              <PostCard post={post} key={post.$id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
