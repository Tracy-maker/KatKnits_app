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

  return <div className="saved-container">
    <div></div>
  </div>;
};

export default Saved;
