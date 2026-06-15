import { useState ,useEffect   } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";

function VerifyResetOTP() {
    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();
    useEffect(() => {
        if (!email) {
            navigate("/login");
        }
    }, [email, navigate]);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);


    const role = location.state?.role || "candidate";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const endpoint =
                role === "candidate"
                    ? "/auth/candidate/verify-reset-otp"
                    : "/auth/recruiter/verify-reset-otp";

            const res = await API.post(endpoint, {
                email,
                otp
            });

            alert(res.data.message);

            navigate("/reset-password", {
                replace:true,
                state: {
                    email,
                    role
                }
            });

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "OTP verification failed"
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
                    Verify OTP
                </h2>

                <p className="text-gray-500 text-center mb-6">
                    Enter the OTP sent to your email
                </p>


                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
                />


                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
                >
                    {
                        loading
                        ? "Verifying..."
                        : "Verify OTP"
                    }
                </button>


            </form>

        </div>
    );
}


export default VerifyResetOTP;