import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Role, RoleRoute } from "../../utils/RoleAndRoute";

interface Menu {
  label: string;
  href: string;
  onClick?: () => void;
}

export default function NavBar() {
  const { signOut, user } = useContext(AuthContext);

  const defaultMenus: Menu[] = [
    {
      label: "Log Out",
      href: "",
      onClick: signOut,
    },
  ];

  const MENUS = {
    USER: [
      {
        label: "Home",
        href: RoleRoute(Role.USER),
      },
      {
        label: "Courses",
        href: "/courses",
      },
      {
        label: "My Courses",
        href: "/my-courses",
      },
      ...defaultMenus,
    ],
    TEACHER: [
      {
        label: "Home",
        href: RoleRoute(Role.TEACHER),
      },
      {
        label: "Create Course",
        href: "/create-course",
      },
      {
        label: "My Courses",
        href: "/courses-created",
      },
      ...defaultMenus,
    ],
    ADMIN: [
      {
        label: "Home",
        href: RoleRoute(Role.ADMIN),
      },
      {
        label: "Users",
        href: "/users",
      },
      {
        label: "Teachers",
        href: "/teachers",
      },
      {
        label: "Create Teacher",
        href: "/create-teacher",
      },
      ...defaultMenus,
    ],
  };

  return (
    <div className="navbar bg-base-100 dark:bg-base-300 flex flex-wrap justify-between shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Language School</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {MENUS[user!.role!].map((menu) => {
            return (
              <li>
                {menu.onClick ? (
                  <a onClick={signOut}>Logout</a>
                ) : (
                  <Link to={menu.href}>{menu.label}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
