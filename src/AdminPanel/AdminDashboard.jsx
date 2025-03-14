import {
    Users,
    DollarSign,
    ShoppingCart,
    TrendingUp,
    BarChart,
    Circle,
  } from "lucide-react";
  
  const AdminDashboard = () => {
    return (
      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value="2,543"
            change="+12.5%"
            icon={<Users className="text-yellow-500" />}
          />
          <StatCard
            title="Revenue"
            value="$45,234"
            change="+8.2%"
            icon={<DollarSign className="text-yellow-500" />}
          />
          <StatCard
            title="Orders"
            value="1,234"
            change="+23.1%"
            icon={<ShoppingCart className="text-yellow-500" />}
          />
          <StatCard
            title="Growth"
            value="18.5%"
            change="+4.3%"
            icon={<TrendingUp className="text-yellow-500" />}
          />
        </div>
  
        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Performance Overview
              </h2>
              <select className="border rounded-md px-2 py-1 text-sm text-gray-600">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-[300px] flex items-center justify-center border-b">
              <BarChart size={240} className="text-gray-300" />
              <span className="text-gray-400 ml-2">Chart Placeholder</span>
            </div>
          </div>
  
          {/* Activity Feed */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const StatCard = ({ title, value, change, icon }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">{value}</h3>
            <p className="text-green-500 text-sm mt-1">{change}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-md">{icon}</div>
        </div>
      </div>
    );
  };
  
  const ActivityItem = ({ user, action, time }) => {
    return (
      <div className="flex items-center space-x-3">
        <Circle size={8} className="text-yellow-500" />
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{user}</span> {action}
          </p>
          <p className="text-xs text-gray-400">{time}</p>
        </div>
      </div>
    );
  };
  
  const activities = [
    {
      user: "John Doe",
      action: "created a new project",
      time: "2 minutes ago",
    },
    {
      user: "Sarah Smith",
      action: "updated their profile",
      time: "15 minutes ago",
    },
    {
      user: "Mike Johnson",
      action: "completed a task",
      time: "1 hour ago",
    },
    {
      user: "Anna Brown",
      action: "added new comment",
      time: "2 hours ago",
    },
    {
      user: "David Wilson",
      action: "uploaded a file",
      time: "3 hours ago",
    },
  ];
  
  export default AdminDashboard;