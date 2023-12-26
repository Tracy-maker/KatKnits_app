import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savedPost: Models.Document) => ({
      ...savePosts.post,
      creator: {
        imageUrl: currentUser.imagUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="flex gap-2 w-full max-w-5xl">
        <img
          src="https://img.icons8.com/?size=64&id=42847&format=png"
          width={60}
          height={60}
          alt="edit"
        />
        <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>
      {!currentUser ? <Loader /> : <ul></ul>}
    </div>
  );
};

export default Saved;