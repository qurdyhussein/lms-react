import { useEffect, useState } from "react";
import { FaExchangeAlt, FaExclamationCircle } from "react-icons/fa";

const TenantSwitcher: React.FC = () => {
  const [tenants, setTenants] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    fetch("http://localhost:8000/api/superadmin/tenants/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .catch(() => setError("Failed to load tenants"));
  }, []);

  const openTenant = () => {
    if (!selected) {
      setError("Please select a tenant before opening.");
      return;
    }

    setError(null);
  window.open(`http://${selected}:5173/login`, "_blank");
};


  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow rounded p-6">
      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
        <FaExchangeAlt className="text-purple-600" />
        Tenant Switcher
      </h3>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <select
          className="border border-purple-300 rounded p-2 text-sm w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Select Tenant</option>
          {tenants.map((tenant, index) => (
            <option key={index} value={tenant}>
              {tenant}
            </option>
          ))}
        </select>

        <button
          onClick={openTenant}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition w-full md:w-auto"
        >
          Open Tenant
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium flex items-center gap-2">
          <FaExclamationCircle /> {error}
        </p>
      )}
    </div>
  );
};

export default TenantSwitcher;