import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ENDPOINTS } from "../constants/endpoints";

const TenantLoginPage = () => {
  const [institution, setInstitution] = useState<any>(null);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await fetch(ENDPOINTS.TENANT_PROFILE, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch institution info");
        const data = await response.json();
        setInstitution(data);
      } catch (err: any) {
        toast.error("❌ Could not load institution info");
      }
    };

    fetchInstitution();
  }, []);

  const handleLogin = async () => {
    if (!registrationNumber || !password) {
      toast.error("⚠️ Tafadhali jaza taarifa zote");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(ENDPOINTS.TENANT_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ registration_number: registrationNumber, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error || "Taarifa si sahihi";
        throw new Error(errorMessage);
      }

      localStorage.setItem("access_token", data.access);

      toast.success(`🎉 Karibu ${institution?.name}! Umefanikiwa kuingia`);
      toast(`🔁 Redirecting to dashboard...`, {
        icon: "🚀",
        style: {
          borderRadius: "8px",
          background: "#f3e8ff",
          color: "#6b21a8",
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 2500));
      window.location.href = data.dashboard;
    } catch (err: any) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 px-4 py-10 font-inter relative">
      {/* 🔄 Full-screen loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-opacity-50"></div>
        </div>
      )}

      <div className="w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg bg-purple-50 rounded-xl shadow-2xl p-6 space-y-6 border border-purple-200 z-10">
        {/* 🏫 Institution Branding */}
        {institution && (
          <div className="text-center space-y-2">
            {institution.logo_url && (
              <div className="animate-bounce">
                <img
                  src={institution.logo_url}
                  alt="Institution Logo"
                  className="w-20 h-20 mx-auto rounded-full border-4 border-purple-500 shadow-lg"
                />
              </div>
            )}
            <h2 className="text-2xl font-bold text-purple-700">{institution.name}</h2>
            <p className="text-sm text-gray-600">{institution.location}</p>
            <p className="text-sm text-gray-600">{institution.contacts}</p>
            {institution.website && (
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline text-sm hover:text-purple-800 transition"
              >
                {institution.website}
              </a>
            )}
          </div>
        )}

        {/* 🔐 Login Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm bg-white"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition text-sm ${
              loading ? "bg-purple-400 cursor-not-allowed animate-pulse" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "⏳ Logging in..." : " Login"}
          </button>
          <div className="text-right">
            <button className="text-sm text-purple-600 hover:underline">Forgot Password?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantLoginPage;