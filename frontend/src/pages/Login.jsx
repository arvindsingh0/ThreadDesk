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

    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">

      {/* Background Glow */}

      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full top-[-150px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full bottom-[-150px] right-[-100px]" />

      {/* Grid Overlay */}

      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}

      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        {/* Branding */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white mb-2">
            ThreadDesk
          </h1>

          <p className="text-zinc-400">
            Let your team focus on growth, not repetitive support queries.
          </p>

        </div>

        {/* Heading */}

        <div className="mb-8">

          <h2 className="text-2xl font-semibold text-white mb-2">
            Welcome back
          </h2>

          <p className="text-zinc-400">
            Login to continue.
          </p>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white transition"
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >

            Login

          </button>

        </form>

        {/* Footer */}

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