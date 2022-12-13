import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../../utils/API_URL";
import defaultHeaders from "../../../utils/defaultHeaders";
import { Role } from "../../../utils/RoleAndRoute";

export default function RegisterTeacher() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      role: Role.TEACHER,
    };

    setLoading(true);

    await fetch(API_URL + "/user", {
      method: "POST",
      ...defaultHeaders,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json().then((data) => {
          setLoading(false);
          if (response.status === 200) {
            alert("Usuário cadastrado com sucesso!");
            navigate("/teachers");
          } else {
            alert(data.error);
          }
        });
      })
      .catch((error) => {
        setLoading(false);
        alert("Ocorreu um erro inesperado, tente novamente mais tarde!");
      });
  }

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" name="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            className="input input-bordered"
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
