import { useState } from 'react';

import { DataTable } from '@/components/ui/custom/DataTable';
import { useUser } from '@/hooks/useUser';
import { useGetStudentApplicationsQuery } from '@/services/apiSlice';

import { AppliedJobsTableColumns } from './AppliedJobsTableColumns';
import ApplicationStatusFilter from './ApplicationStatusFilter';

const TrackApplications = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('all');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: paginatedPosts, isLoading: isGetApplicationsLoading } = useGetStudentApplicationsQuery({
    studentId: user!.id,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filter: { search: searchQuery, status }
  });


  if (isGetApplicationsLoading) {
    return <div className="flex justify-center items-center h-screen">Loading</div>;
  }

  return (
    <div className="flex flex-col px-5 pb-5">
      <div className="p-4">
        <DataTable
          data={paginatedPosts?.data || []}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={paginatedPosts?.totalPages || 0}
          columns={AppliedJobsTableColumns}
          filter={<ApplicationStatusFilter setStatus={setStatus} />}
        />
      </div>
    </div>
  );
};

export default TrackApplications;
