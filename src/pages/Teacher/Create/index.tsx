import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import API_URL from "../../../utils/API_URL";
import defaultHeaders from "../../../utils/defaultHeaders";

export default function CreateCourse() {
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(API_URL + "/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      ...defaultHeaders,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData.error) {
      return alert(responseData.error);
    }

    if (response.status === 200) {
      alert("Course created");
      return navigate("/courses-created");
    }
  }

  return (
    <div className="p-4">
      <Title>Create a course</Title>
      <form onSubmit={handleSubmit} className="form-control">
        <Input label="Name" name="name" />
        <Input label="Description" name="description" />
        <button
          className="btn btn-active btn-primary mt-4 max-w-xs"
          type="submit"
        >
          Criar
        </button>
      </form>
    </div>
  );
}
