import { useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Topic {
  title: string;
  text: string;
}

export interface Course {
  name: string;
  description: string;
  topics: Topic[];
  _id: string;
}

interface CardProps extends Course {
  subcribed?: boolean;
}

export default function Card({ name, description, _id, subcribed }: CardProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function subscribe() {
    setLoading(true);
    const response = await fetch(`http://localhost:3333/course/${_id}/user`, {
      method: "POST",
      credentials: "include",
    });
    setLoading(false);

    const { data, error } = await response.json();

    if (error) {
      alert(error);
    }

    navigate("/course/" + _id);
  }

  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={subcribed ? () => navigate("/course/" + _id) : subscribe}
            disabled={loading}
          >
            {subcribed ? "View" : "Subscribe"}
          </button>
        </div>
      </div>
    </div>
  );
}
