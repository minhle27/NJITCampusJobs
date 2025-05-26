import type { JobPost } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

import { CaretSortIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { usePermissions } from '@/hooks/usePermissions';
import { useUser } from '@/hooks/useUser';
import { useEditPostMutation } from '@/services/apiSlice';
import { useToast } from '@/components/hooks/use-toast';
import { formatDate } from '@/utils';
import getErrorMessage from '@/utils/getErrorMessage';

import Actions from './Actions';

export const JobsTableColumns: ColumnDef<JobPost>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Created At
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = String(row.getValue('createdAt'));

      return formatDate(date);
    },
    enableSorting: true,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Updated At
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = String(row.getValue('updatedAt'));

      return formatDate(date);
    },
    enableSorting: true,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const { isOwner } = usePermissions();
      const { user } = useUser();
      const { toast } = useToast();
      const [updatePost, { isLoading: isLoadingUpdate }] = useEditPostMutation();
      
      const status = row.getValue('status') as string;
      const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
      const jobPost = row.original;
      
      // Check if the current user is the owner of this specific job post
      const isJobOwner = user && isOwner(jobPost.employer);
      
      let color = '';
      if (status === 'open') color = 'green';
      else if (status === 'close') color = 'red';

      const handleStatusToggle = async () => {
        if (isLoadingUpdate) return;
        
        const newStatus = status === 'open' ? 'close' : 'open';
        
        try {
          await updatePost({
            id: jobPost.id,
            title: jobPost.title,
            externalApplication: jobPost.externalApplication,
            jobDescription: jobPost.jobDescription,
            location: jobPost.location,
            salary: String(jobPost.salary),
            status: newStatus,
          }).unwrap();
          
          toast({
            title: 'Status Updated!',
            description: `Job status changed to ${newStatus}`,
          });
        } catch (e) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong:',
            description: getErrorMessage(e),
          });
        }
      };

      if (isJobOwner) {
        return (
          <Button
            variant="ghost"
            onClick={handleStatusToggle}
            disabled={isLoadingUpdate}
            className="p-0 h-auto font-normal hover:bg-gray-100"
            style={{ color }}
          >
            {capitalizedStatus}
          </Button>
        );
      }

      return <p style={{ color }}>{capitalizedStatus}</p>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <Actions row={row} />;
    },
  },
];
