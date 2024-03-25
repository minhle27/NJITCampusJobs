import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  return auth.user === null ? <Navigate to="/login" /> : children;
};

export default RequireAuth;
