import { Routes, Route } from "react-router-dom";
import TenantLoginPage from "./pages/TenantLoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

const TenantApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<TenantLoginPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/instructor-dashboard" element={<InstructorDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/tenant/:schema/login" element={<TenantLoginPage />} />
    </Routes>
  );
};

export default TenantApp;