import { useState } from "react";
import API from "../api/axios";

function SendInvite() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendInvite = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.post("/invites/send", { email });

            alert("Invite sent successfully!");
            setEmail("");

        } catch (err) {
            alert(err.response?.data?.message || "Error sending invite");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-gray-100">

            <form
                onSubmit={handleSendInvite}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-100"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Invite Recruiter
                </h2>

                <p className="text-gray-500 text-sm mb-6 text-center">
                    Send an invitation to join your company
                </p>

                <input
                    type="email"
                    placeholder="Enter recruiter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        mt-5 w-full bg-purple-600 text-white py-3 rounded-xl
                        hover:bg-purple-700 transition font-medium
                    "
                >
                    {loading ? "Sending..." : "Send Invite ✉️"}
                </button>
            </form>
        </div>
    );
}

export default SendInvite;  