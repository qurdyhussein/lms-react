import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AnalyticsPoint {
  month: string;
  logins: number;
  institutions: number;
}

const ChartPanel: React.FC = () => {
  const [data, setData] = useState<AnalyticsPoint[]>([]);
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

    fetch("http://localhost:8000/api/superadmin/analytics/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch analytics");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-lg font-semibold text-purple-700 mb-4">System Analytics</h3>

      {loading ? (
        <p className="text-sm text-gray-600">Loading chart...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="logins" stroke="#9333ea" name="Logins" />
            <Line type="monotone" dataKey="institutions" stroke="#f43f5e" name="Institutions" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartPanel;