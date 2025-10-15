import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  MessageSquare,
  TrendingUp,
  Calendar,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTrainers: 0,
    totalContacts: 0,
    newMemberships: 0,
  });

  const [loading, setLoading] = useState(true);

  // Mock data - in production, this would come from your API
  useEffect(() => {
    const fetchStats = async () => {
      // Simulate API call
      setTimeout(() => {
        setStats({
          totalUsers: 1247,
          totalTrainers: 12,
          totalContacts: 89,
          newMemberships: 23,
        });
        setLoading(false);
      }, 1000);
    };

    fetchStats();
  }, []);

  // Mock chart data
  const memberGrowthData = [
    { month: "Jan", members: 1000 },
    { month: "Feb", members: 1050 },
    { month: "Mar", members: 1100 },
    { month: "Apr", members: 1150 },
    { month: "May", members: 1200 },
    { month: "Jun", members: 1247 },
  ];

  const membershipTypeData = [
    { name: "Basic", value: 45, color: "#667eea" },
    { name: "Premium", value: 35, color: "#764ba2" },
    { name: "VIP", value: 20, color: "#f093fb" },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Joined gym",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      user: "Sarah Smith",
      action: "Upgraded to Premium",
      time: "4 hours ago",
      type: "info",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Contacted support",
      time: "6 hours ago",
      type: "warning",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "Booked training session",
      time: "8 hours ago",
      type: "success",
    },
  ];

  const statCards = [
    {
      title: "Total Members",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      change: "+12%",
    },
    {
      title: "Active Trainers",
      value: stats.totalTrainers,
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
      change: "+2",
    },
    {
      title: "Contact Messages",
      value: stats.totalContacts,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      change: "+5",
    },
    {
      title: "New Memberships",
      value: stats.newMemberships,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      change: "+18%",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening at FitFat Gym.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="admin-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Growth Chart */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Member Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={memberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="members"
                stroke="#667eea"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Membership Types Chart */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Membership Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={membershipTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name} ${value}%`}
              >
                {membershipTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activities
        </h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === "success"
                    ? "bg-green-500"
                    : activity.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="admin-btn-primary flex items-center justify-center space-x-2 py-3">
            <Users className="w-5 h-5" />
            <span>View All Members</span>
          </button>
          <button className="admin-btn-secondary flex items-center justify-center space-x-2 py-3">
            <UserCheck className="w-5 h-5" />
            <span>Manage Trainers</span>
          </button>
          <button className="admin-btn-secondary flex items-center justify-center space-x-2 py-3">
            <MessageSquare className="w-5 h-5" />
            <span>View Messages</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
