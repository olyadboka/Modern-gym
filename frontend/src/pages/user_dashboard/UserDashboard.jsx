import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  CreditCard,
  Settings,
  Activity,
  TrendingUp,
  Award,
  Bell,
  Edit,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { bookingAPI } from "../../utils/api";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [isAuthenticated, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch user bookings
      const bookingsResponse = await bookingAPI.getUserBookings();
      if (bookingsResponse.data.success) {
        setBookings(bookingsResponse.data.bookings || []);
      }

      // Set membership info from user data
      if (user) {
        setMembership({
          type: user.membershipType || "Basic",
          joinDate: user.joinDate,
          status: user.isActive ? "active" : "inactive",
          autoRenew: true,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      label: "Classes This Month",
      value: bookings.length.toString(),
      icon: Activity,
    },
    {
      label: "Total Bookings",
      value: bookings.length.toString(),
      icon: TrendingUp,
    },
    {
      label: "Membership Type",
      value: membership?.type || "Basic",
      icon: Award,
    },
    {
      label: "Member Since",
      value: user?.joinDate
        ? new Date(user.joinDate).toLocaleDateString()
        : "N/A",
      icon: Calendar,
    },
  ];

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's your fitness dashboard overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Upcoming Classes
                </h2>
                <button className="btn-primary">Book New Class</button>
              </div>

              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {booking.className || booking.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {booking.trainerName || "Trainer"}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.date} at {booking.time}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No bookings yet</p>
                    <button
                      onClick={() => navigate("/schedule")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Book a Class
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Membership Info */}
          <div>
            <div className="card mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Membership
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Current Plan</p>
                  <p className="text-xl font-bold text-gray-900">
                    {membership?.type}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      membership?.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {membership?.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-gray-900">
                    {membership?.joinDate
                      ? new Date(membership.joinDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-600">Auto Renew</span>
                  <span className="text-sm text-gray-900">
                    {membership?.autoRenew ? "On" : "Off"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/membership")}
                className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Manage Membership
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => navigate("/schedule")}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>View Schedule</span>
                </button>
                <button
                  onClick={() => navigate("/trainers")}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5 text-gray-400" />
                  <span>Book Trainer</span>
                </button>
                <button
                  onClick={() => navigate("/membership")}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span>Payment History</span>
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-400" />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
