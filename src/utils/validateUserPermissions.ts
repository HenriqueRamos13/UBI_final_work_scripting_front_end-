import { Role } from "./RoleAndRoute";

interface User {
  role: Role;
}

interface validateUserPermissionsParams {
  user: User;
  roles?: string[];
}

export function validateUserPermissions({
  user,
  roles,
}: validateUserPermissionsParams) {
  let hasAllRoles = true;

  if (roles?.length) {
    const userRole = user?.role || null;

    hasAllRoles = roles.includes(userRole);
  }

  return { hasAllRoles };
}
