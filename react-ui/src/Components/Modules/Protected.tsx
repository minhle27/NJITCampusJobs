import { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";

/**
 * Wrap this Protected component around functionality like edit
 * to ensure that only resource's owner can make changes to their 
 * data 
 */

const Protected = ({ children, id }: { children: ReactNode, id: string }) => {
  const auth = useAuth();
  if (auth.user?.id === id) {
    return children;
  }
  return <></>;
};

export default Protected;
