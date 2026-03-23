import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // make sure this is your axios instance
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(""); // for showing errors
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Basic client-side validation
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const response = await API.post("/auth/login", { email, password });
            login(response.data.user, response.data.token);
            navigate("/jobs"); // redirect after successful login
        } catch (err) {
            setError(err.response?.data?.message || "Wrong email or password");
        }
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)]">
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    {/* Show error message */}
                    {error && <div className="text-red-500 mb-2 text-center">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        <button 
                            type="submit"
                            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;