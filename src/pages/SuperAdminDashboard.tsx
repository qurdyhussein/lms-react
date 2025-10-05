import { useEffect, useState } from "react";
import { FaSchool, FaUsers, FaMoneyCheckAlt } from "react-icons/fa";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import StatCard from "./components/StatCard";
import InstitutionTable from "./components/InstitutionTable";
import ChartPanel from "./components/ChartPanel";
import JwtViewer from "./components/JwtViewer";
import AuditLogs from "./components/AuditLogs";
import ProvisioningSimulator from "./components/ProvisioningSimulator";
import SystemNotifications from "./components/SystemNotifications";
import ApiTester from "./components/ApiTester";
import TenantSwitcher from "./components/TenantSwitcher";
import SettingsPanel from "./components/SettingsPanel";
import ExportPreview from "./components/ExportPreview";
import DashboardFooter from "./components/DashboardFooter";

const SuperAdminDashboard: React.FC = () => {
  const [institutionCount, setInstitutionCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) return;

    fetch("http://localhost:8000/api/superadmin/stats/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setInstitutionCount(data.total_institutions);
        setUserCount(data.total_users);
      })
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 space-y-6">
          {/* Stat Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Total Institutions" value={institutionCount} icon={<FaSchool />} color="purple" />
            <StatCard title="Active Users" value={userCount} icon={<FaUsers />} color="green" />
            <StatCard title="Pending Payments" value={12} icon={<FaMoneyCheckAlt />} color="rose" />
          </section>

          <ChartPanel />
          <InstitutionTable />
          <JwtViewer />
          <AuditLogs />
          <ProvisioningSimulator />
          <SystemNotifications />
          <ApiTester />
          <TenantSwitcher />
          <SettingsPanel />
          <ExportPreview />
          <DashboardFooter />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;