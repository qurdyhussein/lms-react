import { useState } from "react";
import { FaBullhorn, FaExclamationCircle } from "react-icons/fa";

interface Notification {
  title: string;
  message: string;
  urgency: "info" | "urgent";
}

const SystemNotifications: React.FC = () => {
  const [form, setForm] = useState<Notification>({
    title: "",
    message: "",
    urgency: "info",
  });

  const [sent, setSent] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendNotification = async () => {
    if (!form.title || !form.message) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const role = localStorage.getItem("role");

      if (!token || role?.toLowerCase() !== "superadmin") {
        setError("Unauthorized: SuperAdmin token missing or invalid.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8000/api/superadmin/send-notification/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to send notification");

      setSent((prev) => [...prev, form]);
      setForm({ title: "", message: "", urgency: "info" });
    } catch (err) {
      console.error("Notification error:", err);
      setError("Failed to send notification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow rounded p-6">
      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
        <FaBullhorn className="text-purple-600" />
        System Notifications
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border border-purple-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          className="border border-purple-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={form.urgency}
          onChange={(e) => setForm({ ...form, urgency: e.target.value as "info" | "urgent" })}
        >
          <option value="info">Info</option>
          <option value="urgent">Urgent</option>
        </select>
        <button
          onClick={sendNotification}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </div>

      <textarea
        rows={4}
        placeholder="Message"
        className="w-full border border-purple-300 rounded p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      {error && (
        <p className="text-sm text-red-600 font-medium mb-2 flex items-center gap-2">
          <FaExclamationCircle /> {error}
        </p>
      )}

      {sent.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Sent Notifications:</h4>
          {sent.map((note, index) => (
            <div
              key={index}
              className={`p-3 rounded text-sm ${
                note.urgency === "urgent" ? "bg-red-100 border border-red-300" : "bg-blue-50 border border-blue-200"
              }`}
            >
              <strong className="block text-gray-800">{note.title}</strong>
              <p className="text-gray-700">{note.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SystemNotifications;