import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Applicants from "./pages/Applicants";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
    <div className="w-full min-h-screen text-black bg-gray-50">

    
      <Navbar />

      <Routes>

        {/* ✅ SMART ROOT REDIRECT */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/jobs" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* ✅ PUBLIC ROUTES (block if logged in) */}
        <Route
          path="/login"
          element={
            !isAuthenticated
              ? <Login />
              : <Navigate to="/jobs" replace />
          }
        />

        <Route
          path="/register"
          element={
            !isAuthenticated
              ? <Register />
              : <Navigate to="/jobs" replace />
          }
        />

        {/* ✅ PROTECTED ROUTES */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        

      <Route
  path="/recruiter/job/:id/applicants"
  element={<Applicants />}
/>
      </Routes>

      </div>
    </BrowserRouter>
  );
}



export default App;
