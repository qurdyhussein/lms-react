import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TenantLoginPage = () => {
  const [institution, setInstitution] = useState<any>(null);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const hostname = window.location.hostname;
        const response = await fetch(`http://${hostname}:8000/tenant/institution-info/`, {
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
      toast.error("⚠️ Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/tenant-login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ registration_number: registrationNumber, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Login failed");

      toast.success("✅ Login successful");
      localStorage.setItem("access_token", data.access);
      window.location.href = data.dashboard;
    } catch (err: any) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6 space-y-6">
        {/* 🏫 Institution Branding */}
        {institution && (
          <div className="text-center space-y-2">
            {institution.logo && (
              <div className="animate-spin-slow">
                <img
                  src={`http://${window.location.hostname}:8000/${institution.logo}`}
                  alt="Institution Logo"
                  className="w-20 h-20 mx-auto rounded-full border-2 border-blue-500 shadow-md"
                />
              </div>
            )}
            <h2 className="text-2xl font-bold text-blue-700">{institution.name}</h2>
            <p className="text-sm text-gray-600">{institution.location}</p>
            <p className="text-sm text-gray-600">{institution.contacts}</p>
            {institution.website && (
              <a
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm hover:text-blue-800 transition"
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
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold transition ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "⏳ Logging in..." : "🔐 Login"}
          </button>
          <div className="text-right">
            <button className="text-sm text-blue-600 hover:underline">Forgot Password?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantLoginPage;