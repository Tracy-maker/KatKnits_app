import GridPostList from "@/components/shared/GridPostList";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import { useGetPosts } from "@/lib/react-query/queriesAndMutations";
import { useState } from "react";

const Explore = () => {

  
  const [searchValue, setSearchValue] = useState("");
  // const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  // const shouldShowSearchResults = searchValue !== "";
  // const shouldShowPosts =
  //   !shouldShowSearchResults &&
  //   posts.pages.every((item) => item.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="https://img.icons8.com/?size=64&id=43165&format=png"
            width={60}
            height={30}
            alt="search"
          />
          <Input
            type="text"
            value={searchValue}
            placeholder="Search"
            className="explore-search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {/* {shouldShowSearchResults ? ( */}
          <SearchResults />
        {/* ) : shouldShowPosts ? ( */}
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          {/* posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )} */}
      </div>
    </div>
  );
};

export default Explore;
