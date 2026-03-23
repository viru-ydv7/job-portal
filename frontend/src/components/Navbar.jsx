import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md border-b h-16 flex items-center px-6">
            <div className="flex justify-between w-full items-center">
                {/* Logo */}
                <Link 
                    to="/" 
                    className="text-2xl font-bold text-purple-600 hover:opacity-80 transition"
                >
                    JobPortal
                </Link>

                {/* Right side */}
                <div className="flex items-center gap-6 text-sm font-medium">
                    {isAuthenticated && user?.role === "recruiter" && (
                        <Link to="/post-job" className="text-gray-700 hover:text-blue-600 transition">
                            Post Job
                        </Link>
                    )}

                    {user?.role === "candidate" && (
                        <Link to="/my-applications" className="text-gray-700 hover:text-blue-600 transition">
                            My Applications
                        </Link>
                    )}

                    {isAuthenticated && (
                        <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition">
                            Jobs
                        </Link>
                    )}

                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
                                Login
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;