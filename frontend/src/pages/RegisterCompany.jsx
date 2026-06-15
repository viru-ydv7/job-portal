import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function RegisterCompany() {
    const [form, setForm] = useState({
        companyName: "",
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
            await API.post("/auth/create-company", form);
            console.log("Going to verify page", form.email);
            alert("Company created successfully");
            navigate("/verify-otp", {
                state: {
                    email: form.email,
                    role: "recruiter"
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
                    Create Company
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        name="companyName"
                        placeholder="Company Name"
                        onChange={handleChange}
                        className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        required
                    />

                    <input
                        name="name"
                        placeholder="Admin Name"
                        onChange={handleChange}
                        className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        required
                    />

                    <input
                        name="email"
                        placeholder="Admin Email"
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
                        Create Company
                    </button>

                </div>
            </form>
        </div>
    );
}

export default RegisterCompany;