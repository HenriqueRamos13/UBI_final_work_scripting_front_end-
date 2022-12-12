import { useEffect, useState } from "react";
import Card, { Course } from "../../../components/Card";
import Title from "../../../components/Title";

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);

  async function getCourses() {
    const response = await fetch("http://localhost:3333/course", {
      credentials: "include",
    });
    const { data } = await response.json();
    setCourses(data);
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="p-4">
      <Title>Our courses</Title>
      <div className="flex flex-row items-center justify-between">
        {courses.map((course) => (
          <Card key={course._id} {...course} />
        ))}
      </div>
    </div>
  );
}
