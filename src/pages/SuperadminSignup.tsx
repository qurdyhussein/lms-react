import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ENDPOINTS } from "../constants/endpoints";
import lmsLogo from "../assets/lms.jpeg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuperadminSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "superadmin",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post(ENDPOINTS.SUPERADMIN_SIGNUP, formData);
      toast.success("🛡️ Superadmin account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Signup failed.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 overflow-hidden px-4">
      {/* Spinner Background */}
      <div className="absolute inset-0 z-0 animate-spin-slow">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-30 mx-auto mt-[-200px]"></div>
      </div>

      {/* Spinner Loader */}
      {isLoading ? (
        <div className="relative z-10 flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mb-4"></div>
          <p className="text-blue-600 font-medium">Creating your superadmin account...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSignup}
          className="relative z-10 bg-white p-6 rounded-2xl border border-gray-300 shadow-xl w-full max-w-md text-center"
        >
          <img
            src={lmsLogo}
            alt="LMS Logo"
            className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-blue-500 shadow-md"
          />

          <h2 className="text-2xl font-bold mb-4 text-gray-800">Superadmin Signup</h2>

          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input type="hidden" name="role" value="superadmin" />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
            disabled={isLoading}
          >
            Create Superadmin Account
          </button>

          <p className="mt-4 text-sm text-blue-600">
            Already registered?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default SuperadminSignup;