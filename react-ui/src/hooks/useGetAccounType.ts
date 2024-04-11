import { useAuth } from "./useAuth";

export const useGetAccountType = () => {
  const user = useAuth().user;
  return user?.accountType;
};
