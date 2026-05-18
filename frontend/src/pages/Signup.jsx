import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/signup",
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Signup failed");

    }

  };

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-white mb-2">

          Create Account

        </h1>

        <p className="text-zinc-400 mb-8">

          Start using ThreadDesk AI.

        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white"
          />

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

            Signup

          </button>

        </form>

        <p className="text-zinc-400 mt-6 text-center">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-white hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;