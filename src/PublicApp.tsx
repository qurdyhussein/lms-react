import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import SuperadminSignup from "./pages/SuperadminSignup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      {/* Toast container must be outside Routes */}
      <ToastContainer position="top-center" autoClose={3000} />
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/secret/superadmin-signup" element={<SuperadminSignup />} />
      </Routes>
    </>
  );
}

export default App;