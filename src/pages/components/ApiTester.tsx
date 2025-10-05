import { useState } from "react";
import { FaPaperPlane, FaServer, FaExclamationCircle } from "react-icons/fa";

const ApiTester: React.FC = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = async () => {
    if (!url.startsWith("http")) {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: method !== "GET" ? body : undefined,
      });

      const text = await res.text();
      setResponse(text);
    } catch (err) {
      setResponse("❌ Request failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow rounded p-6">
      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
        <FaServer className="text-purple-600" />
        API Tester
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          className="border border-purple-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          type="text"
          placeholder="Endpoint URL"
          className="border border-purple-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={sendRequest}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition flex items-center gap-2 justify-center"
        >
          <FaPaperPlane />
          {loading ? "Sending..." : "Send Request"}
        </button>
      </div>

      {method !== "GET" && (
        <textarea
          rows={4}
          placeholder="Request Body (JSON)"
          className="w-full border border-purple-300 rounded p-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}

      {error && (
        <p className="text-sm text-red-600 font-medium mb-2 flex items-center gap-2">
          <FaExclamationCircle /> {error}
        </p>
      )}

      {response && (
        <div className="mt-4 bg-white border border-purple-200 p-4 rounded text-sm overflow-auto">
          <h4 className="font-semibold text-gray-700 mb-2">Response:</h4>
          <pre className="whitespace-pre-wrap break-words text-gray-800">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default ApiTester;