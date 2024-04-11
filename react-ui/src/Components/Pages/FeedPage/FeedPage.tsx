import FeedList from "./FeedList";
import { useState } from "react";
import SearchBar from "../../Modules/SearchBar";
import SortBar from "../../Modules/SortBar";

const FeedPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <section>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <SortBar />
      <div className="flex justify-center">
        <div className="border w-3/4 flex h-feed-list overflow-y-auto">
          <FeedList searchValue={searchValue} />
        </div>
      </div>
    </section>
  );
};

export default FeedPage;
