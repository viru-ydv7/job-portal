import { useState ,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;
    const role = location.state?.role || "candidate";

    useEffect(() => {
        if (!email) {
            navigate("/login");
        }
    }, [email, navigate]);
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }


        try {

            setLoading(true);

            const endpoint =
                role === "candidate"
                    ? "/auth/candidate/reset-password"
                    : "/auth/recruiter/reset-password";


            const res = await API.post(endpoint, {
                email,
                newPassword: password
            });


            alert(res.data.message);


            navigate("/login",{
                replace:true,
            });


        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Password reset failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-gray-100">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-100"
            >

                <h2 className="text-2xl font-bold text-center mb-2">
                    Reset Password
                </h2>

                <p className="text-gray-500 text-center mb-6">
                    Enter your new password
                </p>


                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                />


                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full mt-4 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
                >
                    {
                        loading
                        ? "Updating Password..."
                        : "Reset Password"
                    }
                </button>


            </form>

        </div>
    );
}


export default ResetPassword;