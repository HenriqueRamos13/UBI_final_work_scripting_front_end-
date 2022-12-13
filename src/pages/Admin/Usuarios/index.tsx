import { useEffect, useState } from "react";
import { Course } from "../../../components/Card";
import Title from "../../../components/Title";
import API_URL from "../../../utils/API_URL";
import defaultHeaders from "../../../utils/defaultHeaders";
import { Role } from "../../../utils/RoleAndRoute";

export interface User {
  _id: string;
  email: string;
  role: Role;
  courses: number;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState([]);

  async function getCoursesHasUsers() {
    const response = await fetch(API_URL + "/course/all/user/all", {
      ...defaultHeaders,
    });
    const { data } = await response.json();

    setCourses(data);
  }

  async function getUsers() {
    const response = await fetch(API_URL + "/user?type=" + Role.USER, {
      ...defaultHeaders,
    });
    const { data, error } = await response.json();

    if (error) {
      alert(error);
      return;
    }

    setUsers(data);
  }

  useEffect(() => {
    getCoursesHasUsers();
    getUsers();
  }, []);

  return (
    <div className="p-4">
      <Title>Users in the platform</Title>
      <table className="table w-full">
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Role</th>
          <th>Courses subscribed</th>
        </tr>

        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              {courses.filter((c) => (c as any).user === user._id).length}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
