import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ENDPOINTS } from "../constants/endpoints";
import lmsLogo from "../assets/lms.jpeg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "client",
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
      await api.post(ENDPOINTS.SIGNUP, formData);
      toast.success("🎉 Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 4000);
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Signup failed. Please check your inputs or try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden px-4">
      {/* Spinner Background */}
      <div className="absolute inset-0 z-0 animate-spin-slow">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-30 mx-auto mt-[-200px]"></div>
      </div>

      {/* Spinner Loader */}
      {isLoading ? (
        <div className="relative z-10 flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mb-4"></div>
          <p className="text-blue-600 font-medium">Creating your account...</p>
        </div>
      ) : (
        <form
          onSubmit={handleSignup}
          className="relative z-10 bg-white p-6 rounded-2xl border border-blue-200 shadow-xl w-full max-w-md text-center"
        >
          <img
            src={lmsLogo}
            alt="LMS Icon"
            className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-blue-500 shadow-md"
          />

          <h2 className="text-2xl font-bold mb-4 text-blue-700">Create Client Account</h2>

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

          <input type="hidden" name="role" value="client" />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm text-blue-600">
            Already have an account?{" "}
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

export default Signup;