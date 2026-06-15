// import { Link, useNavigate } from "react-router-dom";
// import { useContext , useState } from "react";
// import { AuthContext } from "../context/AuthContext";

// function Navbar() {
//     const { user, isAuthenticated, logout } = useContext(AuthContext);
//     const navigate = useNavigate();
//     console.log("USER:", user);
//     const handleLogout = () => {
//         logout();
//         setShowLogoutModal(false);
//         navigate("/login");

//     };

//     const [showLogoutModal, setShowLogoutModal] = useState(false);

//     return (
//         <nav className="bg-white shadow-md border-b h-16 flex items-center px-6">
//             <div className="flex justify-between w-full items-center">
//                 {/* Logo */}
//                 <Link
//                     to="/"
//                     className="text-2xl font-bold text-purple-600 hover:opacity-80 transition"
//                 >
//                     JobPortal
//                 </Link>

//                 {/* Right side */}
//                 <div className="flex items-center gap-6 text-sm font-medium">
//                     {/* RECRUITER SIDE */}
//                     {isAuthenticated && user?.role === "recruiter" && (
//                         <> 
//                             <Link to="/recruiter/dashboard" className="text-gray-700 hover:text-blue-600 transition" >
//                                 Dashboard
//                             </Link>
//                             <Link to="/post-job" className="text-gray-700 hover:text-blue-600 transition">
//                                 Post Job
//                             </Link>

//                         </>
//                     )}
//                     {isAuthenticated && user?.role === "admin" && (
//                         <>
//                             <Link
//                                 to="/invites/send"
//                                 className="
//                                 bg-purple-600 text-white px-4 py-2 rounded-xl
//                                 hover:bg-purple-700 transition">
//                                 Invite Recruiters
//                             </Link> 
                            
                            
//                         </>
//                     )}

//                     {user?.role === "candidate" && (
//                         <Link to="/my-applications" className="text-gray-700 hover:text-blue-600 transition">
//                             My Applications
//                         </Link>
//                     )}

//                     {isAuthenticated && (
//                         <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition">
//                             Jobs
//                         </Link>
//                     )}

//                     {!isAuthenticated ? (
//                         <>
//                             <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">
//                                 Login
//                             </Link>
//                             <Link
//                                 to="/register"
//                                 className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
//                             >
//                                 Register
//                             </Link>
//                         </>
//                     ) : (
//                         <button
//                             onClick={()=> setShowLogoutModal(true)}
//                             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
//                         >
//                             Logout
//                         </button>
//                     )}
//                 </div>

//                 {
// showLogoutModal && (
//     <div className="
//         fixed inset-0
//         bg-black/50
//         flex items-center justify-center
//         z-50
//     ">

//         <div className="
//             bg-white
//             rounded-2xl
//             p-6
//             w-96
//             shadow-xl
//         ">

//             <h2 className="
//                 text-xl
//                 font-bold
//                 text-purple-600
//             ">
//                 👋 Logout
//             </h2>


//             <p className="mt-3 text-gray-600">
//                 Are you sure you want to logout?
//             </p>


//             <p className="text-sm text-gray-500 mt-2">
//                 You will need to sign in again to access your account.
//             </p>


//             <div className="
//                 mt-6
//                 flex
//                 justify-end
//                 gap-3
//             ">

//                 <button
//                     onClick={() => setShowLogoutModal(false)}
//                     className="
//                         px-4 py-2
//                         rounded-lg
//                         bg-gray-200
//                         hover:bg-gray-300
//                     "
//                 >
//                     Cancel
//                 </button>


//                 <button
//                     onClick={handleLogout}
//                     className="
//                         px-4 py-2
//                         rounded-lg
//                         bg-purple-600
//                         text-white
//                         hover:bg-purple-700
//                     "
//                 >
//                     Logout
//                 </button>

//             </div>

//         </div>

//     </div>
// )
// }
//             </div>
//         </nav>
//     );
// }

// export default Navbar;













import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);


    const handleLogout = () => {
        logout();
        setShowLogoutModal(false);
        navigate("/login");
    };


    return (
        <>
            <nav className="
                bg-white/90
                backdrop-blur-md
                sticky top-0 z-40
                border-b border-gray-200
                h-16 px-8
                flex items-center
                shadow-sm
            ">

                <div className="flex justify-between items-center w-full">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="
                            text-3xl
                            font-extrabold
                            text-purple-600
                            tracking-tight
                            hover:text-purple-700
                            transition
                        "
                    >
                        JobPortal
                    </Link>


                    {/* Navigation */}
                    <div className="flex items-center gap-6 text-sm font-semibold">

                        {/* Recruiter */}
                        {isAuthenticated && user?.role === "recruiter" && (
                            <>
                                <Link
                                    to="/recruiter/dashboard"
                                    className="
                                        text-gray-700
                                        hover:text-purple-600
                                        transition
                                    "
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/post-job"
                                    className="
                                        text-gray-700
                                        hover:text-purple-600
                                        transition
                                    "
                                >
                                    Post Job
                                </Link>
                            </>
                        )}


                        {/* Admin */}
                        {isAuthenticated && user?.role === "admin" && (
                            <Link
                                to="/invites/send"
                                className="
                                    bg-purple-600
                                    text-white
                                    px-5 py-2
                                    rounded-lg
                                    hover:bg-purple-700
                                    transition
                                "
                            >
                                Invite Recruiters
                            </Link>
                        )}


                        {/* Candidate */}
                        {isAuthenticated && user?.role === "candidate" && (
                            <Link
                                to="/my-applications"
                                className="
                                    text-gray-700
                                    hover:text-purple-600
                                    transition
                                "
                            >
                                My Applications
                            </Link>
                        )}


                        {/* Jobs */}
                        {isAuthenticated && (
                            <Link
                                to="/jobs"
                                className="
                                    text-gray-700
                                    hover:text-purple-600
                                    transition
                                "
                            >
                                Jobs
                            </Link>
                        )}


                        {/* Guest */}
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="
                                        text-gray-700
                                        hover:text-purple-600
                                        transition
                                    "
                                >
                                    Login
                                </Link>


                                <Link
                                    to="/register"
                                    className="
                                        bg-purple-600
                                        text-white
                                        px-5 py-2
                                        rounded-lg
                                        hover:bg-purple-700
                                        transition
                                    "
                                >
                                    Register
                                </Link>
                            </>
                        ) : (

                            <button
                                onClick={() => setShowLogoutModal(true)}
                                className="
                                    bg-red-500
                                    text-white
                                    px-5 py-2
                                    rounded-lg
                                    hover:bg-red-600
                                    transition
                                "
                            >
                                Logout
                            </button>

                        )}

                    </div>

                </div>

            </nav>


            {/* Logout Modal */}
            {showLogoutModal && (

                <div className="
                    fixed inset-0
                    bg-black/50
                    backdrop-blur-sm
                    flex items-center justify-center
                    z-50
                ">

                    <div className="
                        bg-white
                        rounded-2xl
                        p-6
                        w-[90%]
                        max-w-md
                        shadow-2xl
                    ">

                        <h2 className="
                            text-2xl
                            font-bold
                            text-purple-600
                        ">
                            👋 Logout
                        </h2>


                        <p className="
                            mt-3
                            text-gray-700
                        ">
                            Are you sure you want to logout?
                        </p>


                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            You will need to sign in again to access your account.
                        </p>


                        <div className="
                            mt-6
                            flex justify-end gap-3
                        ">

                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="
                                    px-5 py-2
                                    rounded-lg
                                    bg-gray-200
                                    hover:bg-gray-300
                                    font-medium
                                    transition
                                "
                            >
                                Cancel
                            </button>


                            <button
                                onClick={handleLogout}
                                className="
                                    px-5 py-2
                                    rounded-lg
                                    bg-purple-600
                                    text-white
                                    font-medium
                                    hover:bg-purple-700
                                    transition
                                "
                            >
                                Logout
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

export default Navbar;