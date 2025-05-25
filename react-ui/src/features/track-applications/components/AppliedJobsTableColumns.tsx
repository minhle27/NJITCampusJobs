import type { Application  } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

import { CaretSortIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils';

import AppliedJobsTableActions from './AppliedJobsTableActions';

export const AppliedJobsTableColumns: ColumnDef<Application>[] = [
  {
    accessorKey: 'job.title',
    header: 'Title',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Submitted At
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
      const status = row.getValue('status') as string;
      const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

      let statusColor;

      switch (status) {
        case 'accepted':
          statusColor = 'text-green-500';
          break;
        case 'rejected':
          statusColor = 'text-red-500';
          break;
        case 'pending':
          statusColor = 'text-gray-500';
          break;
        default:
          statusColor = 'text-black';
      }

      return <div className={statusColor}>{capitalizedStatus}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return <AppliedJobsTableActions row={row} />;
    },
  },
];
