import { Models } from "appwrite";
import React from "react";
import Loader from "./Loader";

type SearchResultsProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultsProps) => {
  if(isSearchFetching) return <Loader/>
  return <div></div>;
};

export default SearchResults;
