import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  CreditCard, 
  Settings,
  Activity,
  TrendingUp,
  Award,
  Bell
} from 'lucide-react';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [membership, setMembership] = useState(null);

  useEffect(() => {
    // Mock data - in production, this would come from your API
    setTimeout(() => {
      setUser({
        name: 'John Doe',
        email: 'john@example.com',
        membershipType: 'Premium',
        joinDate: '2024-01-15'
      });
      
      setBookings([
        {
          _id: '1',
          title: 'Morning Yoga',
          date: '2024-01-20',
          time: '06:00-07:00',
          trainer: 'Emily Rodriguez',
          status: 'confirmed'
        },
        {
          _id: '2',
          title: 'HIIT Cardio',
          date: '2024-01-22',
          time: '18:00-19:00',
          trainer: 'Mike Chen',
          status: 'confirmed'
        }
      ]);

      setMembership({
        type: 'Premium',
        startDate: '2024-01-15',
        endDate: '2024-02-15',
        status: 'active',
        autoRenew: true
      });
    }, 1000);
  }, []);

  const stats = [
    { label: 'Classes This Month', value: '12', icon: Activity },
    { label: 'Workouts Completed', value: '45', icon: TrendingUp },
    { label: 'Achievements', value: '8', icon: Award },
    { label: 'Days Active', value: '28', icon: Calendar }
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Here's your fitness dashboard overview.</p>
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
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Classes</h2>
                <button className="btn-primary">Book New Class</button>
              </div>
              
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.title}</h3>
                        <p className="text-sm text-gray-600">{booking.trainer}</p>
                        <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Membership Info */}
          <div>
            <div className="card mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Membership</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Current Plan</p>
                  <p className="text-xl font-bold text-gray-900">{membership?.type}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {membership?.status}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Expires</p>
                  <p className="text-gray-900">{membership?.endDate}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-600">Auto Renew</span>
                  <span className="text-sm text-gray-900">{membership?.autoRenew ? 'On' : 'Off'}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 admin-btn-secondary">
                Manage Membership
              </button>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>View Schedule</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <User className="w-5 h-5 text-gray-400" />
                  <span>Book Trainer</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <span>Payment History</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
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
