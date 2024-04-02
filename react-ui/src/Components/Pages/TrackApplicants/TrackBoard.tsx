import { useState } from "react";
import { JobPost } from "../../../types";
import SearchBar from "../../Modules/SearchBar";
import StatBar from "./StatBar";
import ApplicantsList from "./ApplicantsList";

const TrackBoard = ({ post }: { post: JobPost }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col grow max-w-screen-lg min-w-fit max-h-[90vh] overflow-auto bg-gray-200 p-5 m-7 shadow-lg rounded-lg">
      <StatBar post={post} />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <ApplicantsList post={post} searchValue={searchValue} />
    </div>
  );
};

export default TrackBoard;
