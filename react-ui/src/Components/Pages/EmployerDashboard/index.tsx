import { useRef, useState } from "react";
import SearchBar from "../../Modules/SearchBar";
import { useParams } from "react-router-dom";
import JobsList from "./JobsList";
import Protected from "../../Modules/Protected";
import JobForm from "./JobForm";
import { ToggleHandle } from "../../Modules/FormFrameModal";

const EmployerDashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const { id } = useParams();
  const jobFormRef = useRef<ToggleHandle>(null);

  const handleClickCreateNew = () => {
    if (jobFormRef.current) {
      jobFormRef.current.toggleVisibility();
    }
  }

  return (
    <div className="flex flex-col max-h-screen">
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <JobsList employerId={id!} />
      <Protected id={id!}>
        <>
          <div className="flex justify-center mt-5 mb-5">
            <button
              onClick={handleClickCreateNew}
              className="grow max-w-sm py-2 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-900 focus:outline-none"
            >
              Create New Jobs
            </button>
          </div>
          <JobForm jobFormRef={jobFormRef} />
        </>
      </Protected>
    </div>
  );
};

export default EmployerDashboard;
