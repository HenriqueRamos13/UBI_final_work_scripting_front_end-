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
}

export default function Teachers() {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  async function getCourses() {
    const response = await fetch(API_URL + "/course", {
      ...defaultHeaders,
    });

    const { data, error } = await response.json();

    if (error) {
      alert(error);
      return;
    }

    setCourses(data);
  }

  async function getTeachers() {
    const response = await fetch(API_URL + "/user?type=" + Role.TEACHER, {
      ...defaultHeaders,
    });
    const { data, error } = await response.json();

    if (error) {
      alert(error);
      return;
    }

    setTeachers(data);
  }

  useEffect(() => {
    getCourses();
    getTeachers();
  }, []);

  return (
    <div className="p-4">
      <Title>Teachers in the platform</Title>
      <table className="table w-full">
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Role</th>
          <th>Courses created</th>
        </tr>

        {teachers.map((teacher) => (
          <tr key={teacher._id}>
            <td>{teacher._id}</td>
            <td>{teacher.email}</td>
            <td>{teacher.role}</td>
            <td>
              {
                courses.filter((course) => course.teacher === teacher._id)
                  .length
              }
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
