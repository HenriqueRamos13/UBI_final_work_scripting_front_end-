import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { Role } from "../utils/RoleAndRoute";
import { validateUserPermissions } from "../utils/validateUserPermissions";

interface IPrivateRoute {
  roles?: Role[];
  redirectTo?: string;
  children: ReactNode;
}

export function PrivateRoute({
  roles,
  redirectTo = "/login",
  children,
}: IPrivateRoute) {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { hasAllRoles } = validateUserPermissions({
    user: user as any,
    roles,
  });

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  if (!hasAllRoles) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
