import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/candidate/register", form);
      alert("OTP sent successfully");
      navigate("/verify-otp", {
          state: {
              email: form.email,
              role: "candidate"
          }
      });
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)]
    overflow-hidden
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-white
    via-purple-50
    to-gray-100">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Candidate Register
        </h2>

        <div className="flex flex-col gap-4">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
            required
          />

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

          <button
            className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-medium"
          >
            Register
          </button>

        </div>
      </form>
    </div>
  );
}

export default Register;