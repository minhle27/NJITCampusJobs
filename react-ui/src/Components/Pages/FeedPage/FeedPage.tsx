import FeedList from "./FeedList";
import { useState } from "react";
import SearchBar from "../../Modules/SearchBar";
import SortBar from "../../Modules/SortBar";

const FeedPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");

  return (
    <section className="flex flex-col max-h-[90vh] min-w-screen-[1000px]">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <SortBar setSortType={setSortType} />
      <FeedList searchValue={searchValue} />
    </section>
  );
};

export default FeedPage;
