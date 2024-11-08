import type { Application } from '@/types';
import type { ColumnDef } from '@tanstack/react-table';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import ApplicantTableActions from './ApplicantTableActions';

export const ApplicantTableColumns: ColumnDef<Application>[] = [
  {
    accessorKey: 'student.profilePicture',
    header: 'Profile Picture',
    cell: ({ row }) => {
      const profilePicture = row.original.student.profilePicture.fileUrl;

      return (
        <Avatar>
          <AvatarImage src={profilePicture} alt="ProfilePicture" />
          <AvatarFallback>ProfilePicture</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'student.fullName',
    header: 'Name',
  },
  {
    accessorKey: 'student.email',
    header: 'Email',
  },
  {
    accessorKey: 'student.phone',
    header: 'Phone',
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
      return <ApplicantTableActions row={row} />;
    },
  },
];
