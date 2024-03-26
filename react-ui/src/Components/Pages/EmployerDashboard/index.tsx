import { useState } from "react";
import SearchBar from "../../Modules/SearchBar";

const EmployerDashboard = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
  );
};

export default EmployerDashboard;

