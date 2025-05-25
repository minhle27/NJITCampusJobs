// react-ui/src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

import { useUser } from '@/hooks/useUser';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
