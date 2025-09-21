import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { ENDPOINTS } from "../constants/endpoints";
import lmsLogo from "../assets/lms.jpeg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post(ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { access, refresh, role, username } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      toast.success(`👋 Welcome back, ${username}! Redirecting...`);

      setTimeout(() => {
        if (role === "superadmin") {
          navigate("/superadmin/dashboard");
        } else if (role === "client") {
          navigate("/client/dashboard");
        } else {
          setError("Unknown role. Contact support.");
        }
      }, 3500);
    } catch (err: any) {
      setError("Invalid credentials or server error.");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden px-4">
      {/* Spinner Background */}
      <div className="absolute inset-0 z-0 animate-spin-slow">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-30 mx-auto mt-[-200px]"></div>
      </div>

      {/* Spinner Loader */}
      {isLoading ? (
        <div className="relative z-10 flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mb-4"></div>
          <p className="text-blue-600 font-medium">Logging you in...</p>
        </div>
      ) : (
        <form
          onSubmit={handleLogin}
          className="relative z-10 bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-200 shadow-xl w-full max-w-md text-center"
        >
          <img
            src={lmsLogo}
            alt="LMS Icon"
            className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-blue-500 shadow-md"
          />

          <h2 className="text-2xl font-bold mb-4 text-blue-700">Welcome Back</h2>

          {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={isLoading}
          >
            Login
          </button>

          <div className="mt-4 flex justify-between text-sm text-blue-600">
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="hover:underline"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;