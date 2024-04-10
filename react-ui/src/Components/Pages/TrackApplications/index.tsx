import { useParams } from "react-router-dom";
import Protected from "../../Modules/Protected";
import SearchBar from "../../Modules/SearchBar";
import { useState } from "react";
// import PostExcerpt from "../EmployerDashboard/PostExcerpt";

const TrackApplications = () => {
  const { id: studentId } = useParams();
  const [searchValue, setSearchValue] = useState("");
  

  return (
    <Protected id={studentId!}>
      <div className="flex flex-col max-h-[93vh]">
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
    </Protected>
  );
};

export default TrackApplications;
