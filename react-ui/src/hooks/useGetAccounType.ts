import { useUser } from './useUser';

export const useGetAccountType = () => {
  const { user } = useUser();


  return user?.accountType;
};
