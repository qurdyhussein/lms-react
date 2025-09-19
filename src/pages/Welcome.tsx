import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import lmsLogo from "../assets/lms.jpeg"; // 👈 Replace with your actual logo path

const Welcome = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 text-center px-4">
      <img
        src={lmsLogo}
        alt="LMS Logo"
        className="w-32 h-32 mb-6 animate-grow"
      />

      <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
        Welcome to the Learning Management System
      </h1>

      {showText && (
        <p className="text-lg text-gray-600 mb-8 animate-fade-in-slow">
          A modern platform for learning, teaching, and managing your institution efficiently.
        </p>
      )}

      <button
        onClick={() => navigate("/login")}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  );
};

export default Welcome;