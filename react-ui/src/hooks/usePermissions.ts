// src/utils/permissions.ts
import { useUser } from './useUser';

export const usePermissions = () => {
  const { user } = useUser();

  const isEmployer = () => user?.accountType === 'employer';
  const isStudent = () => user?.accountType === 'student';
  const isOwner = (ownerId: string) => user?.id === ownerId;

  return { isEmployer, isStudent, isOwner };
};