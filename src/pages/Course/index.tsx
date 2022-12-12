import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card, { Course } from "../../components/Card";
import Input from "../../components/Input";
import Title from "../../components/Title";
import { AuthContext } from "../../context/AuthContext";
import API_URL from "../../utils/API_URL";
import defaultHeaders from "../../utils/defaultHeaders";
import { Role } from "../../utils/RoleAndRoute";

export default function CoursePage() {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState<Course | null>(null);
  const { id } = useParams();

  async function getCourse() {
    const response = await fetch(API_URL + "/course/" + id, {
      ...defaultHeaders,
    });
    const { data } = await response.json();
    setCourse(data);
  }

  useEffect(() => {
    getCourse();
  }, []);

  async function createTopic(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    const entries = Object.fromEntries(data.entries());

    const topic = {
      ...entries,
    };

    const response = await fetch(API_URL + "/course/" + id + "/topic", {
      ...defaultHeaders,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic),
    });
    const { error } = await response.json();

    if (error) {
      alert(error);
      return;
    }

    setCourse({
      ...course,
      topics: [...course!.topics, topic],
    } as any);
  }

  return (
    <div className="p-4">
      <Title>{course?.name}</Title>

      {user?.role === Role.TEACHER && (
        <>
          <Title>Create Topic</Title>
          <form onSubmit={createTopic}>
            <Input name="title" label="Title" />
            <Input name="text" label="Código" />
            <button className="btn btn-primary my-4" type="submit">
              Create
            </button>
          </form>
        </>
      )}
      <Title>Topics</Title>
      <div className="flex flex-row items-center justify-between">
        {course &&
          course.topics.map((topic, index) => (
            <div
              key={index}
              tabIndex={0}
              className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box"
            >
              <div className="collapse-title text-xl font-medium">
                {topic.title}
              </div>
              <div className="collapse-content">
                <div className="mockup-code">
                  <pre data-prefix="$" className="text-success">
                    <code>{topic.text}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
