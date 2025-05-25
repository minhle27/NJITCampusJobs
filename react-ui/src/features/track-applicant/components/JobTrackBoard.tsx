import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { DataTable } from '@/components/ui/custom/DataTable';
import { useGetApplicationsByPostQuery } from '@/services/apiSlice';

import { ApplicantTableColumns } from './ApplicantTableColumns';
import StatusFilter from './StatusFilter';

const JobTrackBoard = () => {
  const { jobId } = useParams();
  const [status, setStatus] = useState('all');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: paginatedApplicantions, isLoading: isGetApplicationsLoading } = useGetApplicationsByPostQuery({
    postId: jobId!,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    filter: { status }
  });

  if (isGetApplicationsLoading) {
    return <div className="flex justify-center items-center h-screen">Loading</div>;
  }

  return (
    <div className="flex flex-col px-5">
      <div className="p-4">
        <DataTable
          columns={ApplicantTableColumns}
          data={paginatedApplicantions!.data.filter(application => application.student !== null) || []}
          filter={<StatusFilter setStatus={setStatus} />}
          pagination={pagination}
          setPagination={setPagination}
          pageCount={paginatedApplicantions!.totalPages}
        />
      </div>
    </div>
  );
};

export default JobTrackBoard;
