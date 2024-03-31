import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

/**
 * Wrap this RequireAuth around components that require authentication
 * to ensure that user can only access once they logged in
 */
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  return auth.user === null ? <Navigate to="/login" /> : children;
};

export default RequireAuth;
