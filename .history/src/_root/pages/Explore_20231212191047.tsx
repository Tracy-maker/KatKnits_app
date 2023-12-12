import { Input } from "@/components/ui/input";
import { useState } from "react";

const Explore = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="https://img.icons8.com/?size=60&id=vh31KMqhxPJn&format=png"
            width={70}
            height={30}
            alt="search"
          />
          <Input type="text" placeholder="Search" className="explore-search" />
        </div>
      </div>
    </div>
  );
};

export default Explore;
