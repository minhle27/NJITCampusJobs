import type { Application } from '@/types';
import type { Row } from '@tanstack/react-table';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActionsProps {
  row: Row<Application>;
}

const AppliedJobsTableActions = ({ row }: ActionsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate(`/jobs/${row.original.job.id}`)}>View job details</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/jobs/${row.original.job.id}`)}>Withdraw</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AppliedJobsTableActions;
