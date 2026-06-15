import { useState, useContext } from "react";
import API from "../api/axios";
import { Link , useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [role, setRole] = useState("candidate");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        role === "candidate"
          ? "/auth/candidate/login"
          : "/auth/recruiter/login";

      const res = await API.post(endpoint, form);

      const token = res.data.token;
      const user = res.data.user;

      if (!user) {
        alert("User not received");
        return;
      }

      login(token, user);

      if (user.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/jobs");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] overflow-hidden flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-100"
      >

        {/* 🔥 HEADER */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>

        {/* 🔹 ROLE TOGGLE */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">

          <button
            type="button"
            onClick={() => setRole("candidate")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition
              ${role === "candidate"
                ? "bg-white shadow text-purple-600"
                : "text-gray-500"}
            `}
          >
            Candidate
          </button>

          <button
            type="button"
            onClick={() => setRole("recruiter")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition
              ${role === "recruiter"
                ? "bg-white shadow text-purple-600"
                : "text-gray-500"}
            `}
          >
            Recruiter
          </button>

        </div>

        {/* 🔹 INPUTS */}
        <div className="flex flex-col gap-4">

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />
          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              state={{ role }}
              className="text-sm text-purple-600 hover:text-purple-800"
            >
              Forgot Password?
            </Link>
          </div>

        </div>

        {/* 🔹 BUTTON */}
        <button
          className="
            mt-6 w-full bg-purple-600 text-white py-3 rounded-xl
            hover:bg-purple-700 transition font-medium
          "
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;