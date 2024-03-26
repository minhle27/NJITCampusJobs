interface Props {
  searchValue : string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>
}

import logo from "../../assets/search-logo.svg";

const SearchBar = ({ searchValue, setSearchValue }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="flex m-4 w-8/12 bg-search-bar rounded-md">
        <input
          name="search-bar"
          className="grow m-2 py-[2px] pl-[6px] pr-2 bg-inherit outline-none font-semibold text-slate-500"
          value={searchValue}
          onChange={({ target }) => setSearchValue(target.value)}
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
