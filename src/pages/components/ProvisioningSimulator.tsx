import { useState } from "react";
import { FaServer, FaGlobe, FaKey, FaUserShield, FaCheckCircle } from "react-icons/fa";

interface FormData {
  name: string;
  domain: string;
  adminEmail: string;
}

const ProvisioningSimulator: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    name: "",
    domain: "",
    adminEmail: "",
  });

  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateProvisioning = () => {
    if (!form.name || !form.domain || !form.adminEmail) {
      setError("Please fill in all fields before simulating.");
      return;
    }

    setLoading(true);
    setLogs([]);
    setError(null);

    setTimeout(() => {
      const steps = [
        `🔧 Creating schema: inst_${form.name.toLowerCase().replace(/\s+/g, "_")}`,
        `🌐 Mapping domain: ${form.domain}.localhost`,
        `🔐 Issuing JWT for ${form.adminEmail}`,
        `👤 Creating admin user`,
        `✅ Provisioning complete`,
      ];
      setLogs(steps);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow rounded p-6">
      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
        <FaServer className="text-purple-600" />
        Provisioning Simulator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Institution Name"
          className="border border-purple-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Domain (e.g. elimu)"
          className="border border-purple-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.domain}
          onChange={(e) => setForm({ ...form, domain: e.target.value })}
        />
        <input
          type="email"
          placeholder="Admin Email"
          className="border border-purple-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.adminEmail}
          onChange={(e) => setForm({ ...form, adminEmail: e.target.value })}
        />
      </div>

      <button
        onClick={simulateProvisioning}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        {loading ? "Simulating..." : "Simulate Provisioning"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}

      {logs.length > 0 && (
        <div className="mt-4 bg-white border border-purple-200 p-4 rounded text-sm space-y-2">
          {logs.map((log, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-700">
              {log.includes("schema") && <FaServer className="text-purple-400" />}
              {log.includes("domain") && <FaGlobe className="text-purple-400" />}
              {log.includes("JWT") && <FaKey className="text-purple-400" />}
              {log.includes("admin user") && <FaUserShield className="text-purple-400" />}
              {log.includes("complete") && <FaCheckCircle className="text-green-500" />}
              <span>{log}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProvisioningSimulator;