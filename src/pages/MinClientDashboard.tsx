import { useEffect, useState } from "react";
import { BASE_DOMAIN } from "../constants/env";
import { ENDPOINTS } from "../constants/endpoints";
import toast from "react-hot-toast";

const MinClientDashboard = () => {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No token found. Please login first.");

        const response = await fetch(ENDPOINTS.getClientInstitution, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data?.error || "Failed to fetch institutions.");
        }

        const data = await response.json();
        setInstitutions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, []);

  const handleDelete = async (schema_name: string) => {
    const confirmed = window.confirm("⚠️ Are you sure you want to delete this institution?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${ENDPOINTS.deleteInstitution}${schema_name}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Failed to delete institution.");
      }

      toast.success("✅ Institution deleted successfully.");
      setInstitutions((prev) => prev.filter((inst) => inst.schema_name !== schema_name));
    } catch (err: any) {
      toast.error(`❌ ${err.message}`);
    }
  };

  const handleUpdate = async (institution: any) => {
    const updatedName = prompt("Enter new institution name:", institution.name);
    const updatedLocation = prompt("Enter new location:", institution.location);
    const updatedContacts = prompt("Enter new contacts:", institution.contacts);
    const updatedWebsite = prompt("Enter new website URL:", institution.website || "");
    const updatedPlan = prompt("Choose plan (free or premium):", institution.plan);
    const updatedDomain = prompt("Enter new subdomain (e.g. udsm.lms.co.tz):", `${institution.schema_name}.lms.co.tz`);

    if (!updatedName || !updatedLocation || !updatedContacts || !updatedPlan || !updatedDomain) {
      toast.error("⚠️ All fields are required.");
      return;
    }

    const updatedFields = {
      institution_name: updatedName,
      location: updatedLocation,
      contacts: updatedContacts,
      website: updatedWebsite,
      plan: updatedPlan,
      domain_url: updatedDomain,
    };

    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${ENDPOINTS.updateInstitution}${institution.schema_name}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Failed to update institution.");
      }

      toast.success("✅ Institution updated successfully.");
      setInstitutions((prev) =>
        prev.map((inst) =>
          inst.schema_name === institution.schema_name ? { ...inst, ...updatedFields } : inst
        )
      );
    } catch (err: any) {
      toast.error(`❌ ${err.message}`);
    }
  };

  if (loading) return <div className="text-center py-10">⏳ Loading dashboard...</div>;
  if (error) return <div className="text-center py-10 text-red-600">❌ {error}</div>;
  if (institutions.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce">🏫</div>
        <h2 className="text-3xl font-bold text-blue-700 animate-pulse mb-2">
          No Institutions Registered Yet
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-xl">
          Welcome to Tanzania’s LMS 🇹🇿. Click on <strong>🏫 Register Institution</strong> in the sidebar to begin onboarding your institution and build a modern, empowering learning platform.

        </p>
      </div>
    );

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {institutions.map((institution, index) => {
        const daysRemaining = Math.ceil(
          (new Date(institution.paid_until).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );

        return (
          <div key={index} className="space-y-4 border border-gray-200 rounded-xl shadow-md p-6 bg-white">
            {/* 🏫 Institution Overview */}
            <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-md p-4">
              <div className="flex items-center gap-3 mb-2">
                {institution.logo && (
                  <img
                    src={`http://127.0.0.1:8000/${institution.logo}`}
                    alt={`${institution.name} Logo`}
                    className="w-10 h-10 rounded-full border border-blue-500 shadow-sm"
                  />
                )}
                <h2 className="text-xl font-bold text-blue-700"> {institution.name}</h2>
              </div>
              <p><strong>🌐 Subdomain:</strong> https://{institution.schema_name}.{BASE_DOMAIN}</p>
              <p><strong>📍 Location:</strong> {institution.location}</p>
              <p><strong>📞 Contacts:</strong> {institution.contacts}</p>
              {institution.website && (
                <p>
                  <strong>🔗 Website:</strong>{" "}
                  <a
                    href={institution.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {institution.website}
                  </a>
                </p>
              )}
            </div>

            {/* 💳 Subscription Status */}
            <div className="bg-white rounded-md border border-green-300 p-4">
              <h2 className="text-lg font-bold text-green-700 mb-2">💳 Subscription Status</h2>
              <p><strong>Plan:</strong> {institution.plan === "free" ? "🎁 Free Plan" : "💎 Premium Plan"}</p>
              <p><strong>Paid Until:</strong> {institution.paid_until}</p>
              <p><strong>⏳ Days Remaining:</strong> {daysRemaining} days</p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
                🔼 Upgrade Plan
              </button>
            </div>

            {/* ⚙️ Actions */}
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => handleUpdate(institution)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                ✏️ Update
              </button>
              <button
                onClick={() => handleDelete(institution.schema_name)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MinClientDashboard;