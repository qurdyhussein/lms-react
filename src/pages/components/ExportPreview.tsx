import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { FaEye, FaEyeSlash, FaClipboard } from "react-icons/fa";

const ExportPreview: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState("");
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    fetch("http://localhost:8000/api/superadmin/jwt-preview/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data.token);
        setPayload(jwtDecode(data.token));
      });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 shadow rounded p-6">
      <h3 className="text-lg font-semibold text-purple-700 mb-4 flex items-center gap-2">
        <FaEye className="text-purple-600" />
        JWT Export Preview
      </h3>

      <button
        onClick={() => setVisible(!visible)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition flex items-center gap-2"
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
        {visible ? "Hide Preview" : "Show JWT Payload"}
      </button>

      {visible && payload && (
        <div className="mt-4 bg-white border border-purple-200 p-4 rounded text-sm relative">
          <pre className="whitespace-pre-wrap break-words text-gray-800">
            {JSON.stringify(payload, null, 2)}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 flex items-center gap-1"
          >
            <FaClipboard />
            {copied ? "Copied!" : "Copy JWT"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportPreview;