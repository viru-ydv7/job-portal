import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

function AcceptInvite() {
    const { token } = useParams();
    

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAccept = async (e) => {
        console.log(e);
        e.preventDefault();

        if (!token) {
            console.log("No token found in URL");
            alert("Invalid invite link");
            return;
        }

        try {
            setLoading(true);

            await API.post("/invites/accept", {
                token,         // ✅ IMPORTANT
                ...form
            });

            alert("Account created successfully!");
            navigate("/login");

        } catch (err) {
            alert(err.response?.data?.message || "Invalid or expired invite");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-gray-100">

            <form
                onSubmit={handleAccept}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-100"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Accept Invitation
                </h2>

                <p className="text-gray-500 text-sm mb-6 text-center">
                    Complete your account to join the company
                </p>

                <div className="flex flex-col gap-4">

                    <input
                        name="name"
                        placeholder="Your Name"
                        onChange={handleChange}
                        className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Set Password"
                        onChange={handleChange}
                        className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                        required
                    />

                </div>

                <button
                    className="
                        mt-6 w-full bg-purple-600 text-white py-3 rounded-xl
                        hover:bg-purple-700 transition font-medium
                    "
                >
                    {loading ? "Processing..." : "Join Company 🚀"}
                </button>

            </form>
        </div>
    );
}

export default AcceptInvite;