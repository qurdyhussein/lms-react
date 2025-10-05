import { useEffect, useState } from "react";
import { FaUserShield, FaClock, FaGlobe } from "react-icons/fa";

interface AuditEntry {
  user: string;
  action: string;
  schema: string;
  timestamp: string;
  ip: string;
}

const AuditLogs: React.FC = () => {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
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

    fetch("http://localhost:8000/api/superadmin/audit-logs/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch audit logs");
        return res.json();
      })
      .then((data) => {
        setLogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching audit logs:", err);
        setError("Failed to load audit logs.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow rounded p-4">
      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
        <FaUserShield className="text-purple-600" />
        Audit Logs
      </h3>

      {loading ? (
        <p className="text-sm text-gray-600">Loading audit logs...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : logs.length === 0 ? (
        <p className="text-sm text-gray-600">No audit logs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-purple-100 rounded">
            <thead>
              <tr className="bg-purple-100 text-purple-700 font-medium">
                <th className="py-2 px-3">User</th>
                <th className="px-3">Action</th>
                <th className="px-3">Schema</th>
                <th className="px-3">Timestamp</th>
                <th className="px-3">IP</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-b hover:bg-purple-50 transition">
                  <td className="py-2 px-3 text-gray-800">{log.user}</td>
                  <td className="px-3 text-gray-700">{log.action}</td>
                  <td className="px-3">
                    <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs font-semibold">
                      {log.schema}
                    </span>
                  </td>
                  <td className="px-3 flex items-center gap-1 text-gray-600">
                    <FaClock className="text-purple-400" />
                    {log.timestamp}
                  </td>
                  <td className="px-3 flex items-center gap-1 text-gray-600">
                    <FaGlobe className="text-purple-400" />
                    {log.ip}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditLogs;