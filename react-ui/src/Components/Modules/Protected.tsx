import { useAuth } from "../../hooks/useAuth";

const Protected = ({ children, id }: { children: JSX.Element, id: string }) => {
  const auth = useAuth();
  if (auth.user?.id === id) {
    return children;
  }
  return <></>;
};

export default Protected;
