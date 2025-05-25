import type { JobPost } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

import { CaretSortIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils';

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
      const status = row.getValue('status') as string;
      const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

      return <div>{capitalizedStatus}</div>;
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
