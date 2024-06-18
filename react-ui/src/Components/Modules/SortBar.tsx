import h_logo from "../../assets/hot_search.svg";
import l_logo from "../../assets/latest_search.svg";
import s_logo from "../../assets/feed-save-logo.svg";
import u_logo from "../../assets/unapplied_search.svg";
interface SortBarProps {
  setSortType: React.Dispatch<React.SetStateAction<string>>;
}

const SortBar = ({ setSortType }: SortBarProps) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="flex w-4/5 bg-sort-bar rounded-md p-3 space-x-6 font-montserat font-bold">
        <div className="sort-bar" onClick={() => setSortType("hot")}>
          <img src={h_logo} />
          <div>Hot</div>
        </div>

        <div className="sort-bar" onClick={() => setSortType("latest")}>
          <img src={l_logo} />
          <div>Latest</div>
        </div>

        <div className="sort-bar" onClick={() => setSortType("saved")}>
          <img src={s_logo} />
          <div>Saved</div>
        </div>

        <div className="sort-bar" onClick={() => setSortType("unapplied")}>
          <img src={u_logo} />
          <div>Unapplied</div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
