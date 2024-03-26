import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

const RequireEmployer = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  if (auth.user === null) {
    return <Navigate to="/login" />;
  }
  return auth.user.accountType === "employer" ? children : <Navigate to="/" />;
};

export default RequireEmployer;
