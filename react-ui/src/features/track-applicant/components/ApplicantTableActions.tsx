import type { Application } from '@/types';
import type { Row } from '@tanstack/react-table';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePermissions } from '@/hooks/usePermissions';

import ApplicationDetailsDialog from './ApplicationDetailsDialog';

interface ActionsProps {
  row: Row<Application>;
}

const ApplicantTableActions = ({ row }: ActionsProps) => {
  const [openApplicationDialog, setOpenApplicationDialog] = useState(false);
  const { isOwner } = usePermissions();
  const { employerId } = useParams();

  return (
    <>
      {isOwner(employerId!) && (
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
              <DropdownMenuItem>View student profile</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenApplicationDialog(true);
                }}
              >
                View Application
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ApplicationDetailsDialog open={openApplicationDialog} setOpen={setOpenApplicationDialog} row={row} />
        </>
      )}
    </>
  );
};

export default ApplicantTableActions;
