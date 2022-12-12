import { useEffect, useState } from "react";
import Card, { Course } from "../../../components/Card";
import Title from "../../../components/Title";
import API_URL from "../../../utils/API_URL";
import defaultHeaders from "../../../utils/defaultHeaders";

export default function CoursesCreated() {
  const [courses, setCourses] = useState<Course[]>([]);

  async function getCourses() {
    const response = await fetch(API_URL + "/course", {
      ...defaultHeaders,
    });
    const { data } = await response.json();
    setCourses(data);
  }

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="p-4">
      <Title>Your courses</Title>
      <div className="flex flex-row items-center justify-between">
        {courses.map((course) => (
          <Card key={course._id} {...course} subcribed />
        ))}
      </div>
    </div>
  );
}
