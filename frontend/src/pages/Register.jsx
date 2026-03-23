import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // make sure this points to your axios instance
import Navbar from "../components/Navbar";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("candidate");
    const [error, setError] = useState("");      // For showing errors
    const [success, setSuccess] = useState("");  // For showing success
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await API.post("/auth/register", {
                name,
                email,
                password,
                role,
            });

            setSuccess("Registration successful! Redirecting to login...");
            
            // Optional: redirect after 1.5 seconds
            setTimeout(() => {
                navigate("/login");
            }, 1500);

            // Clear form
            setName("");
            setEmail("");
            setPassword("");
            setRole("candidate");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col  min-h-[calc(100vh-64px)]">

            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                    {/* Error / Success Messages */}
                    {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
                    {success && <div className="text-green-600 mb-2 text-center">{success}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg"
                            required
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg"
                            required
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg"
                            required
                        />

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border px-4 py-2 rounded-lg"
                            required
                        >
                            <option value="candidate">Candidate</option>
                            <option value="recruiter">Recruiter</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;