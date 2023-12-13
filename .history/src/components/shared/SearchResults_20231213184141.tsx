import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";

type GridPostListProps = {
  posts: Models.Document[];
};

const SearchResults = ({ posts }: GridPostListProps) => {
  const { user } = useUserContext();
  return <ul className="grid-container">
    {posts.map((post) =>(
      <li>{post.caption}</li>
    ))}
  </ul>;
};

export default SearchResults;