import { useState } from "react";

const JwtViewer: React.FC = () => {
  const [token, setToken] = useState("");
  const [payload, setPayload] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const decodeJwt = () => {
    try {
      if (!token || token.split(".").length !== 3) {
        throw new Error("Invalid JWT structure");
      }

      const base64Payload = token.split(".")[1];
      const decoded = JSON.parse(atob(base64Payload));

      // Format exp if present
      if (decoded.exp) {
        decoded.exp_human = new Date(decoded.exp * 1000).toLocaleString();
      }

      setPayload(decoded);
      setError(null);
    } catch (err) {
      setPayload(null);
      setError("Invalid JWT token");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow rounded p-4">
      <h3 className="text-lg font-semibold text-purple-700 mb-4">🔐 JWT Viewer</h3>

      <textarea
        className="w-full border border-purple-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        rows={4}
        placeholder="Paste JWT token here..."
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />

      <button
        onClick={decodeJwt}
        className="mt-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Decode Token
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}

      {payload && (
        <div className="mt-4 bg-white border border-purple-200 p-4 rounded text-sm overflow-auto">
          <h4 className="font-semibold text-gray-700 mb-2">Decoded Payload:</h4>
          <pre className="whitespace-pre-wrap break-words text-gray-800">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default JwtViewer;