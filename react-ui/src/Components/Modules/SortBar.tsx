import h_logo from "../../assets/hot_search.svg";
import l_logo from "../../assets/latest_search.svg";
import s_logo from "../../assets/feed-save-logo.svg";
import u_logo from "../../assets/unapplied_search.svg";

const SortBar = () => {
  return (
    <div className="flex justify-center mb-4">
      <div className="flex w-8/12 bg-sort-bar rounded-md py-1 space-x-6 font-montserat font-bold">
        <div
          className="flex items-center cursor-pointer hover:bg-search-bar space-x-2 px-1"
          onClick={() => console.log("hot")}
        >
          <img src={h_logo} />
          <div>Hot</div>
        </div>

        <div
          className="flex items-center cursor-pointer hover:bg-search-bar space-x-2 px-1"
          onClick={() => console.log("latest")}
        >
          <img src={l_logo} />
          <div>Latest</div>
        </div>

        <div
          className="flex items-center cursor-pointer hover:bg-search-bar space-x-2 px-1"
          onClick={() => console.log("saved")}
        >
          <img src={s_logo} />
          <div>Saved</div>
        </div>

        <div
          className="flex items-center cursor-pointer hover:bg-search-bar space-x-2 px-1"
          onClick={() => console.log("unapplied")}
        >
          <img src={u_logo} />
          <div>Unapplied</div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
