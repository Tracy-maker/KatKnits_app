import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";

type GridPostListProps = {
  posts: Models.Document[];
};

const SearchResults = ({ posts }: GridPostListProps) => {
  const { user } = useUserContext();
  return <div></div>;
};

export default SearchResults;
