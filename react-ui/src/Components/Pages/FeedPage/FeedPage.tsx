import FeedList from "./FeedList";
import { useState } from "react";
import SearchBar from "../../Modules/SearchBar";
import SortBar from "../../Modules/SortBar";

const FeedPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <section className="flex flex-col max-h-[90vh]">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <SortBar />
      <div className="grow overflow-auto w-3/4 border mx-auto min-w-fit">
        <FeedList searchValue={searchValue} />
      </div>
    </section>
  );
};

export default FeedPage;
