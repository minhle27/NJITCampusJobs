import { useState } from "react";
import { JobPost } from "../../../types";
import SearchBar from "../../Modules/SearchBar";
import StatBar from "./StatBar";
import ApplicantsList from "./ApplicantsList";

const TrackBoard = ({ post }: { post: JobPost }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col grow max-w-screen-lg min-w-fit max-h-[90vh] bg-zinc-50 p-5 m-7 shadow-xl rounded-lg">
      <StatBar post={post} />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <ApplicantsList post={post} searchValue={searchValue} />
    </div>
  );
};

export default TrackBoard;
