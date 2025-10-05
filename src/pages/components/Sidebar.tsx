import { useState } from "react";
import {
  FaUniversity,
  FaUsers,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* FaBars Button (only when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-12 left-2 z-50 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white p-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <FaBars className="text-base" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 transition-all duration-500 ease-in-out ${
          isOpen ? "w-64" : "w-0 overflow-hidden"
        } bg-gradient-to-b from-purple-700 via-fuchsia-700 to-pink-700 text-white shadow-xl`}
      >
        {/* Header with Close Icon */}
        <div className="flex items-center justify-between px-6 pt-6">
          <span className="font-bold text-xl whitespace-nowrap tracking-wide">
            LMS SuperAdmin
          </span>
          <button
            onClick={toggleSidebar}
            className="text-white hover:text-gray-300 text-base transition-colors duration-200"
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-2 px-4">
          <SidebarItem icon={<FaUniversity />} label="Institutions" />
          <SidebarItem icon={<FaUsers />} label="Users" />
          <SidebarItem icon={<FaChartLine />} label="Analytics" />
          <SidebarItem icon={<FaCog />} label="Settings" />
          <SidebarItem icon={<FaSignOutAlt />} label="Logout" />
        </nav>
      </aside>
    </>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => (
  <div className="flex items-center space-x-3 py-2 px-2 rounded-md hover:bg-white hover:text-purple-700 cursor-pointer transition-all duration-300">
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Sidebar;