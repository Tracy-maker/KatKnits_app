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
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome to Our Travel Community</h2>
          <p className="text-gray-600 text-base">
            Share your beautiful landscapes and recommendations with fellow travel enthusiasts. Feel free to post about your favorite destinations and tips for travelers.
          </p>
        </div>
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
