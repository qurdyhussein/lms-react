import { useState } from "react";
import lmsLogo from "../assets/lms.jpeg";
import RegisterInstitution from "./RegisterInstitution";
import MinClientDashboard from "./MinClientDashboard";

const ClientDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a1f44] text-white shadow-xl p-6 space-y-6 fixed top-0 left-0 bottom-0 z-20">
        <div className="flex items-center space-x-2 animate-bounce">
          <img
            src={lmsLogo}
            alt="LMS Logo"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
          <span className="text-xl font-bold">LMS</span>
        </div>

        <nav className="space-y-4 mt-8">
          {[
            { key: "dashboard", label: "🏠 Dashboard" },
            { key: "register", label: "🏫 Register Institution" },
            { key: "subscription", label: "📦 Subscription" },
            { key: "profile", label: "👤 Profile Settings" },
            { key: "terms", label: "📜 Terms & Conditions" },
            { key: "contact", label: "📞 Contact Support" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full text-left px-4 py-2 rounded-md transition ${
                activeSection === item.key
                  ? "bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold"
                  : "hover:bg-blue-800"
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="w-full text-left px-4 py-2 rounded-md text-red-300 hover:bg-red-500 hover:text-white transition"
          >
            🔐 Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Top Header */}
        <div className="bg-gray-100 shadow-md py-4 px-6 border-b">
          <div className="overflow-hidden whitespace-nowrap">
  <h1 className="text-2xl font-bold text-blue-700 animate-marquee inline-flex items-center gap-2">
    <img
      src={lmsLogo}
      alt="LMS Icon"
      className="w-8 h-8 rounded-full border border-blue-500 shadow-sm"
    />
    Learning Management System — Empowering Institutions Across Tanzania 🇹🇿
  </h1>
</div>
</div>
        {/* Dynamic Section Rendering */}
        <div className="p-10">
          {activeSection === "dashboard" && <MinClientDashboard />}

          {activeSection === "register" && <RegisterInstitution />}

          {activeSection === "subscription" && (
            <div className="text-gray-700 text-lg">
              <p>📦 Subscription details and upgrade options will appear here.</p>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="text-gray-700 text-lg">
              <p>👤 Profile settings and account info will appear here.</p>
            </div>
          )}

          {activeSection === "terms" && (
            <div className="text-gray-700 text-lg">
              <p>
                📜 These are the terms and conditions for using the LMS platform. Please read carefully before proceeding.
              </p>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="text-gray-700 text-lg">
              <p>
                📞 For support, contact us via email at <strong>support@lms.co.tz</strong> or call <strong>+255 712 345 678</strong>.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;