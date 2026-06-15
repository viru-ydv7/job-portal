import { useNavigate } from "react-router-dom";

function RegisterChoice() {
    const navigate = useNavigate();

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

            <div className="bg-white p-10 rounded-2xl shadow-xl border border-purple-100 text-center w-full max-w-md">

                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Join JobPortal
                </h2>
                <p className="text-gray-500 mb-6">
                    Choose how you want to get started
                </p>

                <div className="flex flex-col gap-4">

                    <button
                        onClick={() => navigate("/register/candidate")}
                        className="
                            bg-purple-600 text-white py-3 rounded-xl
                            hover:bg-purple-700 transition font-medium
                        "
                    >
                        Register as Candidate
                    </button>

                    <button
                        onClick={() => navigate("/register/company")}
                        className="
                            border border-purple-200 text-purple-600 py-3 rounded-xl
                            hover:bg-purple-50 transition font-medium
                        "
                    >
                        Register as Company
                    </button>

                </div>

            </div>
        </div>
    );
}

export default RegisterChoice;