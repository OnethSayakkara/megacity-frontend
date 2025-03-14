import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const menuItems = [
  { icon: LayoutDashboard, text: "Dashboard", link: "/admin/dashboard" },
  { icon: Users, text: "Admins", link: "/admin/admins" },
  { icon: BarChart3, text: "Category", link: "/admin/categories" },
  { icon: FileText, text: "Bookings", link: "/admin/bookings" },
  { icon: Bell, text: "Cabs", link: "/admin/cabs" },
];

export const AdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get userId from local storage
        const token = localStorage.getItem('token'); // Get jwtToken from local storage

        if (!userId || !token) {
          throw new Error('User ID or JWT token not found in local storage');
        }

        const response = await axios.get(`http://localhost:8080/auth/getAdminbyid/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setAdminData(response.data); // Assuming response.data is the Admin object
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch admin data');
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="h-full w-64 bg-white border-r border-gray-200 p-4">Loading...</div>;
  }

  if (error) {
    return <div className="h-full w-64 bg-white border-r border-gray-200 p-4 text-red-600">{error}</div>;
  }

  return (
    <div
      className={`h-full ${
        collapsed ? "w-20" : "w-64"
      } transition-width duration-300 font-grotesk bg-white border-r border-gray-200`}
    >
      {/* Logo/Brand Section */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-yellow-400 flex items-center justify-center">
            <span className="font-bold text-black">A</span>
          </div>
          {!collapsed && <h1 className="ml-2 font-semibold text-black">Admin Panel</h1>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-black"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map(({ icon: Icon, text, link }) => (
            <MenuItem
              key={text}
              icon={<Icon size={20} />}
              text={text}
              active={location.pathname === link}
              collapsed={collapsed}
              link={link}
            />
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {adminData?.adminImage ? (
              <img
                src={adminData.adminImage}
                alt="Admin Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="font-medium text-gray-600">
                {adminData?.adminName?.charAt(0) || 'A'}
              </span>
            )}
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-black">
                {adminData?.adminName || 'John Doe'}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, text, active, collapsed, link }) => {
  return (
    <li>
      <Link
        to={link}
        className={`flex items-center p-2 rounded-md ${
          active
            ? "bg-yellow-50 text-black"
            : "text-gray-700 hover:bg-yellow-50 hover:text-black"
        }`}
      >
        <div className={`${active ? "text-yellow-500" : "text-gray-500"}`}>{icon}</div>
        {!collapsed && <span className="ml-3">{text}</span>}
      </Link>
    </li>
  );
};