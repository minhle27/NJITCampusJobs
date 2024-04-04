import FeedList from "./FeedList";
import { useState } from "react";
import SearchBar from "../../Modules/SearchBar";

const FeedPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <section>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <FeedList searchValue={searchValue} />
    </section>
  );
};

export default FeedPage;
