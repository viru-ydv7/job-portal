import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function VerifyOTP() {
    const location = useLocation();
    const [resending, setResending] = useState(false);
    const [role] = useState(
        location.state?.role || "candidate"
    );
    const [countdown, setCountdown] = useState(0);
    const [email] = useState(
        location.state?.email || ""
    );
    const [otp, setOtp] = useState("");

    const navigate = useNavigate();
    console.log("VERIFY  PAGE LOADED");
    console.log(location.state);
    useEffect(() => {
        if (!email) {
            navigate("/register");
        }
    }, [email, navigate]);
    const handleSubmit = async (e) => {
        console.log("VERIFY OTP CLICKED");
        e.preventDefault();

        try {

            const response = await API.post(
                `/auth/${role}/verify-otp`,
                {
                    email,
                    otp
                }
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Verification Failed"
            );

        }
    };

    const handleResendOTP = async () => {
        console.log("RESEND OTP CLICKED");
        if (countdown > 0) return;

        try {

            setResending(true);

            const response = await API.post(
                `/auth/${role}/resend-otp`,
                {
                    email
                }
            );

            alert(response.data.message);

            setCountdown(30);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to resend OTP"
            );

        } finally {

            setResending(false);

        }

    };

    useEffect(() => {

        if (countdown <= 0) return;

        const timer = setInterval(() => {

            setCountdown(prev => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [countdown]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-gray-100">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-purple-100"
            >

                <h2 className="text-2xl font-bold text-center mb-6">
                    Verify Email
                </h2>

                <div className="flex flex-col gap-4">

                    <input
                        type="email"
                        value={email}
                        readOnly
                        className="p-3 rounded-xl border bg-gray-100"
                    />

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value)
                        }
                        className="p-3 rounded-xl border"
                        required
                    />

                    <button
                        className="bg-purple-600 text-white py-3 rounded-xl"
                    >
                        Verify OTP
                    </button>
                    <div className="mt-4 text-center">

    <p className="text-gray-500 text-sm">
        Didn't receive OTP?
    </p>

    <button
    type="button"
    onClick={handleResendOTP}
    disabled={resending || countdown > 0}
    className={`font-medium ${
        countdown > 0
            ? "text-gray-400 cursor-not-allowed"
            : "text-purple-600 hover:text-purple-800"
    }`}
>
    {
        resending
            ? "Sending..."
            : countdown > 0
                ? `Resend OTP in ${countdown}s`
                : "Resend OTP"
    }
</button>

</div>

                </div>

            </form>

        </div>
    );
}

export default VerifyOTP;