import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    setLoading(true);

    await signIn({
      email: data.get("email") as string,
      password: data.get("password") as string,
    });
    setLoading(false);
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Here we offer programming language courses!</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  className="input input-bordered"
                />
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
                <label className="label text-secondary">
                  <Link to={"/register"}>Want Register?</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={loading}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
