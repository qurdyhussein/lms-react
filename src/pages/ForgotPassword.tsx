import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ENDPOINTS } from "../constants/endpoints";
import lmsLogo from "../assets/lms.jpeg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await api.post(ENDPOINTS.FORGOT_PASSWORD, { email });
      setMessage(
        response.data?.detail ||
          "Password reset instructions have been sent to your email."
      );
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          "Failed to send reset instructions. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl border border-blue-200 shadow-xl w-full max-w-md text-center"
      >
        <img
          src={lmsLogo}
          alt="LMS Icon"
          className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-blue-500 shadow-md"
        />

        <h2 className="text-2xl font-bold mb-4 text-blue-700">Forgot Password</h2>

        {message && <p className="text-green-600 mb-3 text-sm">{message}</p>}
        {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>

        <p className="mt-4 text-sm text-blue-600">
          Remembered your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;