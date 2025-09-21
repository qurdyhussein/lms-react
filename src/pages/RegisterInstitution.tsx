import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ENDPOINTS } from "../constants/endpoints";
import { BASE_DOMAIN } from "../constants/env";

const RegisterInstitution = () => {
  const [formData, setFormData] = useState({
    institution_name: "",
    schema_name: "",
    domain_url: "",
    plan: "free",
    location: "",
    contacts: "",
    website: "",
    logo: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [adminInfo, setAdminInfo] = useState<{ registration_number: string; password: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setShowModal(false);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("No token found. Please login first.");

      const payload = new FormData();
      payload.append("institution_name", formData.institution_name);
      payload.append("schema_name", formData.schema_name);
      payload.append("domain_url", formData.domain_url);
      payload.append("plan", formData.plan);
      payload.append("location", formData.location);
      payload.append("contacts", formData.contacts);
      if (formData.website) payload.append("website", formData.website);
      if (formData.logo) payload.append("logo", formData.logo);

      const response = await fetch(ENDPOINTS.registerInstitution, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: payload,
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData?.detail || "Registration failed");
        } else {
          const text = await response.text();
          throw new Error("Server returned non-JSON response: " + text.slice(0, 100));
        }
      }

      const data = await response.json();
      toast.success(`🎉 ${data.message}`);
      setAdminInfo({
        registration_number: data.institution.registration_number,
        password: data.institution.default_password,
      });
      setShowSuccessModal(true);
    } catch (err: any) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-green-50 min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 animate-spin-slow">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 rounded-full blur-3xl opacity-30 mx-auto mt-[-200px]"></div>
      </div>

      {/* Form Container */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
        className="relative z-10 bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl p-8 space-y-6 animate-fade-in"
      >
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 animate-slide-loop">
          🏫 Register Your Institution
        </h2>

        <input type="text" name="institution_name" placeholder="Institution Name" value={formData.institution_name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" name="schema_name" placeholder="Schema Name" value={formData.schema_name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" name="domain_url" placeholder="Preferred Subdomain" value={formData.domain_url} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <p className="text-sm text-green-600">🌐 Preview: http://{formData.domain_url || "yourname"}.{BASE_DOMAIN}</p>
        <select name="plan" value={formData.plan} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="free">🎁 Free Plan</option>
          <option value="premium">💎 Premium Plan</option>
        </select>
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="text" name="contacts" placeholder="Contact Info (Phone/Email)" value={formData.contacts} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input type="url" name="website" placeholder="Website (optional)" value={formData.website} onChange={handleChange} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <div className="flex items-center space-x-4">
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full" />
          {logoPreview && <img src={logoPreview} alt="Logo Preview" className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md" />}
        </div>

        <button type="submit" disabled={isLoading} className={`w-full py-2 rounded-md transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 text-white hover:bg-blue-800"}`}>
          {isLoading ? "⏳ Launching..." : "🚀 Launch Institution"}
        </button>
      </form>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg animate-fade-in">
            <h3 className="text-xl font-bold text-blue-700 mb-4">🚀 Confirm Launch</h3>
            <ul className="text-gray-700 space-y-2">
              <li><strong>Institution:</strong> {formData.institution_name}</li>
              <li><strong>Schema:</strong> {formData.schema_name}</li>
              <li><strong>Subdomain:</strong> http://{formData.domain_url}.{BASE_DOMAIN}</li>
              <li><strong>Plan:</strong> {formData.plan}</li>
              <li><strong>Location:</strong> {formData.location}</li>
              <li><strong>Contacts:</strong> {formData.contacts}</li>
              {formData.website && <li><strong>Website:</strong> {formData.website}</li>}
              {logoPreview && <li><strong>Logo:</strong> <img src={logoPreview} alt="Logo" className="w-12 h-12 rounded-full border mt-2" /></li>}
            </ul>

            <div className="mt-6 flex justify-end space-x-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Confirm & Launch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fade-in text-center">
            <h3 className="text-2xl font-bold text-green-600 mb-2 animate-bounce">🎉 Success!</h3>
            <p className="text-gray-700 mb-4">
              Your institution <strong>{formData.institution_name}</strong> has been created successfully.
            </p>
            <p className="text-blue-600 font-medium mb-2">
              🌐 <a
                href={`http://${formData.domain_url}.${BASE_DOMAIN}/login`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-800 transition"
              >
                http://{formData.domain_url}.{BASE_DOMAIN}/login
              </a>
            </p>
            {adminInfo && (
              <div className="text-left bg-gray-50 p-4 rounded-md border mt-4">
                <p className="text-sm text-gray-600 mb-1">🔐 Admin Credentials:</p>
                <p><strong>Username:</strong> {adminInfo.registration_number}</p>
                <p><strong>Password:</strong> {adminInfo.password}</p>
              </div>
            )}
            <button
              onClick={() =>
                window.location.href = `http://${formData.domain_url}.${BASE_DOMAIN}/login`
              }
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterInstitution;