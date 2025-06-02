import { Navigate, Outlet } from 'react-router-dom';
import { getRole, isAuthenticated } from './util';

interface AuthComponentProps {
  allowedRoles: string[];
}

const AuthComponent = ({ allowedRoles }: AuthComponentProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }
  const roleStr = getRole();
  const userRole = roleStr ? JSON.parse(roleStr) : ['office operator'];
  if (!allowedRoles.some(role => userRole.includes(role))) {
    // TODO: Redirect to unauthorized page
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthComponent;
