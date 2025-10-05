import { useEffect, useState } from "react";
import { FaEye, FaTrashAlt, FaSync } from "react-icons/fa";

interface Institution {
  id: number;
  name: string;
  schema_name: string;
  domain: string;
  plan: "free" | "premium";
  is_active: boolean;
  created_on: string;
  owner_email: string;
  paid_until: string;
}

const InstitutionTable: React.FC = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    if (!token || role?.toLowerCase() !== "superadmin") {
      setError("Unauthorized: SuperAdmin token missing or invalid.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/superadmin/institutions/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch institutions: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setInstitutions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching institutions:", err);
        setError("Failed to load institutions.");
        setLoading(false);
      });
  }, []);

  const handleView = (inst: Institution) => {
    alert(`Viewing: ${inst.name}\nDomain: ${inst.domain}\nPlan: ${inst.plan}`);
  };

  const handleRenew = async (id: number) => {
    const confirmed = window.confirm("Renew subscription for this institution?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("access_token");
      await fetch(`http://localhost:8000/api/superadmin/institutions/${id}/renew/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ months: 12 }),
      });
      alert("Institution renewed successfully.");
    } catch (err) {
      console.error("Renew failed:", err);
      alert("Failed to renew institution.");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this institution?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("access_token");
      await fetch(`http://localhost:8000/api/superadmin/institutions/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Institution deleted successfully.");
      setInstitutions((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete institution.");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4 w-full">
      <h3 className="text-lg font-semibold text-purple-700 mb-4">Institutions</h3>

      {loading ? (
        <p className="text-sm text-gray-600">Loading institutions...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : institutions.length === 0 ? (
        <p className="text-sm text-gray-600">No institutions found.</p>
      ) : (
        <table className="w-full text-sm text-left table-auto">
          <thead>
            <tr className="text-gray-600 border-b bg-gray-50">
              <th className="py-2 px-2 min-w-[160px]">Name</th>
              <th className="px-2 min-w-[200px]">Domain</th>
              <th className="px-2 min-w-[100px]">Plan</th>
              <th className="px-2 min-w-[100px]">Status</th>
              <th className="px-2 min-w-[120px]">Created</th>
              <th className="px-2 min-w-[140px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {institutions.map((inst) => (
              <tr key={inst.id} className="border-b hover:bg-purple-50">
                <td className="py-2 px-2 font-medium text-gray-800">{inst.name}</td>
                <td className="px-2 text-gray-700">{inst.domain}</td>
                <td className="px-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    inst.plan === "premium" ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-800"
                  }`}>
                    {inst.plan}
                  </span>
                </td>
                <td className="px-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${
                    inst.is_active ? "bg-green-500" : "bg-gray-500"
                  }`}>
                    {inst.is_active ? "active" : "inactive"}
                  </span>
                </td>
                <td className="px-2">{new Date(inst.created_on).toLocaleDateString()}</td>
                <td className="px-2">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleView(inst)} className="text-blue-600 hover:text-blue-800" title="View">
                      <FaEye />
                    </button>
                    <button onClick={() => handleRenew(inst.id)} className="text-yellow-600 hover:text-yellow-800" title="Renew">
                      <FaSync />
                    </button>
                    <button onClick={() => handleDelete(inst.id)} className="text-red-600 hover:text-red-800" title="Delete">
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InstitutionTable;