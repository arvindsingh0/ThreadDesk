import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login failed");

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-white mb-2">

          Welcome Back

        </h1>

        <p className="text-zinc-400 mb-8">

          Login to continue using ThreadDesk.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white"
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >

            Login

          </button>

        </form>

        <p className="text-zinc-400 mt-6 text-center">

          Don’t have an account?{" "}

          <Link
            to="/signup"
            className="text-white hover:underline"
          >
            Signup
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;