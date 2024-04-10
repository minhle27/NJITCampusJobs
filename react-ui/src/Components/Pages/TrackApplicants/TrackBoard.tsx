import { useState } from "react";
import SearchBar from "../../Modules/SearchBar";
import StatBar from "./StatBar";
import ApplicantsList from "./ApplicantsList";
import { useGetApplicationsByPostQuery } from "../../../services/apiSlice";
import { Spinner } from "@chakra-ui/react";

const TrackBoard = ({ postId }: { postId: string }) => {
  const [searchValue, setSearchValue] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = useGetApplicationsByPostQuery(postId);

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <div>{error.toString()}</div>;
  }

  return (
    <div className="flex flex-col grow max-w-screen-lg min-w-fit max-h-[90vh] bg-zinc-50 p-5 m-7 shadow-xl rounded-lg">
      <StatBar applications={applications!} setFilterBy={setFilterBy} />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <ApplicantsList applications={applications!} searchValue={searchValue} filterBy={filterBy} />
    </div>
  );
};

export default TrackBoard;
