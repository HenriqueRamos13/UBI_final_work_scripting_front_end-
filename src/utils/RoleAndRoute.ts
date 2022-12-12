export enum Role {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  USER = "USER",
}

export const RoleRoute = (role: Role) => {
  switch (role) {
    case Role.ADMIN:
      return "/admin";
    case Role.TEACHER:
      return "/teacher";
    case Role.USER:
      return "/user";
    default:
      return "/login";
  }
};
