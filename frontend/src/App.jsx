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
import AcceptInvite from "./pages/AcceptInvite";
import RegisterCompany from "./pages/RegisterCompany";
import RegisterChoice from "./pages/RegisterChoice";
import SendInvite from "./pages/SendInvite";
import VerifyOTP from "./pages/VerifyOTP";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetOTP from "./pages/VerifyResetOTP";
import ResetPassword from "./pages/ResetPassword";
import EditJob from "./pages/EditJob";
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
              ? <RegisterChoice />
              : <Navigate to="/jobs" replace />
          }
        />
        <Route
          path="/register/company"
          element={
            !isAuthenticated
              ? <RegisterCompany />
              : <Navigate to="/jobs" replace />
          }
        />
        <Route
          path="/register/candidate"
          element={
            !isAuthenticated
              ? <Register/>
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
        

        

        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/invites/send" element={<SendInvite />} />
        <Route path="/invites/accept/:token" element={<AcceptInvite />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
        path="/jobs/edit/:id"
        element={<EditJob />}
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
