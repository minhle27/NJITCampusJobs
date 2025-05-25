import type { JobPost } from '@/types';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/custom/DataTable';
import { Input } from '@/components/ui/input';

import { JobsTableColumns } from './JobsTableColumns';

interface JobsTableProps {
  data: JobPost[];
  pagination: { pageIndex: number; pageSize: number };
  setPagination: React.Dispatch<React.SetStateAction<{ pageIndex: number; pageSize: number }>>;
  pageCount: number;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

interface JobsTableFilterProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const JobsTableFilter = ({ setSearchQuery }: JobsTableFilterProps) => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchQuery(searchValue);
  };

  return (
    <div className="flex items-center">
      <Input
        placeholder="Search for job titles..."
        className="min-w-80"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <Button onClick={handleSearchClick} className="ml-2">
        Search
      </Button>
    </div>
  );
};

const JobsTable = ({ data, pagination, setPagination, pageCount, setSearchQuery }: JobsTableProps) => {
  return (
    <DataTable
      columns={JobsTableColumns}
      data={data}
      filter={<JobsTableFilter setSearchQuery={setSearchQuery} />}
      pagination={pagination}
      setPagination={setPagination}
      pageCount={pageCount}
    />
  );
};

export default JobsTable;
