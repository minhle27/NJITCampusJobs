// interface Props {
//   filter : string,
//   setFilter: React.Dispatch<React.SetStateAction<string>>
// }

import { useState } from "react";
import logo from "../../assets/search-logo.svg";

const SearchBar = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex justify-center">
      <div className="flex m-4 w-8/12 bg-search-bar rounded-md">
        <input
          name="search-bar"
          className="grow m-2 py-[5px] pl-[10px] pr-2 bg-inherit outline-none"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          placeholder="Search for a job title..."
        />
        <div className="m-auto pl-[1px] pr-1 pb-1">
          <img src={logo} className="w-8/12 h-3/5" alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
