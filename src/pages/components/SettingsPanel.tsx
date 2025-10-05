import { useEffect, useState } from "react";

const SettingsPanel: React.FC = () => {
  const [maintenance, setMaintenance] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [featureFlags, setFeatureFlags] = useState({
    jwtViewer: true,
    simulator: true,
    auditLogs: true,
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetch("http://localhost:8000/api/superadmin/settings/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMaintenance(data.maintenance);
        setDarkMode(data.darkMode);
        setFeatureFlags(data.featureFlags);
      });
  }, []);

  const updateSetting = (key: string, value: any) => {
    fetch("http://localhost:8000/api/superadmin/settings/", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [key]: value }),
    });
  };

  const updateFeatureFlag = (flag: string, value: boolean) => {
    const newFlags = { ...featureFlags, [flag]: value };
    setFeatureFlags(newFlags);
    updateSetting("featureFlags", newFlags);
  };

  return (
    <div className={`p-6 rounded shadow ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <h3 className="text-lg font-semibold mb-4">System Settings</h3>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={maintenance}
          onChange={() => {
            setMaintenance(!maintenance);
            updateSetting("maintenance", !maintenance);
          }}
        />
        <span>Maintenance Mode</span>
      </label>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => {
            setDarkMode(!darkMode);
            updateSetting("darkMode", !darkMode);
          }}
        />
        <span>Dark Mode</span>
      </label>

      <h4 className="text-sm font-semibold mb-2">Feature Flags:</h4>
      {Object.entries(featureFlags).map(([key, value]) => (
        <label key={key} className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={value}
            onChange={() => updateFeatureFlag(key, !value)}
          />
          <span>{key}</span>
        </label>
      ))}
    </div>
  );
};

export default SettingsPanel;