import { Outlet } from "react-router-dom";
import { AdminSideBar } from "./AdminSideBar";
import { useState } from "react";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Fixed Sidebar */}
      <div
        className={`fixed h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <AdminSideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default AdminLayout;