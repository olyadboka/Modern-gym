import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterMembership, setFilterMembership] = useState("all");

  // Mock data - in production, this would come from your API
  useEffect(() => {
    const fetchUsers = async () => {
      // Simulate API call
      setTimeout(() => {
        setUsers([
          {
            _id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 (555) 123-4567",
            role: "user",
            membershipType: "premium",
            joinDate: "2024-01-15",
            isActive: true,
          },
          {
            _id: "2",
            name: "Sarah Smith",
            email: "sarah@example.com",
            phone: "+1 (555) 234-5678",
            role: "user",
            membershipType: "vip",
            joinDate: "2024-02-20",
            isActive: true,
          },
          {
            _id: "3",
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "+1 (555) 345-6789",
            role: "user",
            membershipType: "basic",
            joinDate: "2024-03-10",
            isActive: false,
          },
          {
            _id: "4",
            name: "Emily Davis",
            email: "emily@example.com",
            phone: "+1 (555) 456-7890",
            role: "coach",
            membershipType: "premium",
            joinDate: "2023-12-05",
            isActive: true,
          },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesMembership =
      filterMembership === "all" || user.membershipType === filterMembership;

    return matchesSearch && matchesRole && matchesMembership;
  });

  const handleToggleStatus = (userId) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user._id !== userId));
    }
  };

  const getMembershipBadge = (type) => {
    const badges = {
      basic: "bg-blue-900 text-blue-300",
      premium: "bg-yellow-900 text-yellow-300",
      vip: "bg-green-900 text-green-300",
    };
    return badges[type] || "bg-blue-900 text-blue-300";
  };

  const getStatusBadge = (isActive) => {
    return isActive ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Users Management</h1>
          <p className="text-gray-400">Manage gym members and their accounts</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 sm:mt-0">
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
          >
            <option value="all" className="bg-gray-800">
              All Roles
            </option>
            <option value="user" className="bg-gray-800">
              Members
            </option>
            <option value="coach" className="bg-gray-800">
              Coaches
            </option>
            <option value="admin" className="bg-gray-800">
              Admins
            </option>
          </select>

          {/* Membership Filter */}
          <select
            value={filterMembership}
            onChange={(e) => setFilterMembership(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
          >
            <option value="all" className="bg-gray-800">
              All Memberships
            </option>
            <option value="basic" className="bg-gray-800">
              Basic
            </option>
            <option value="premium" className="bg-gray-800">
              Premium
            </option>
            <option value="vip" className="bg-gray-800">
              VIP
            </option>
          </select>

          {/* Filter Button */}
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 border border-gray-700">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Membership
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Join Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-800 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-blue-300 font-semibold">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {user.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-sm font-medium capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getMembershipBadge(user.membershipType)}`}
                    >
                      {user.membershipType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-300">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(user.isActive)}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          user.isActive
                            ? "text-red-400 hover:bg-red-900 border-red-800"
                            : "text-green-400 hover:bg-green-900 border-green-800"
                        }`}
                        title={user.isActive ? "Deactivate" : "Activate"}
                      >
                        {user.isActive ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        className="p-2 rounded-lg text-blue-400 hover:bg-blue-900 border border-blue-800 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-900 border border-red-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No users found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-white">{users.length}</h3>
          <p className="text-gray-400">Total Users</p>
        </div>
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-green-400">
            {users.filter((u) => u.isActive).length}
          </h3>
          <p className="text-gray-400">Active Users</p>
        </div>
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-blue-400">
            {users.filter((u) => u.role === "coach").length}
          </h3>
          <p className="text-gray-400">Coaches</p>
        </div>
        <div className="bg-gray-900 rounded-2xl shadow-lg p-6 text-center border border-gray-800">
          <h3 className="text-2xl font-bold text-purple-400">
            {users.filter((u) => u.membershipType === "vip").length}
          </h3>
          <p className="text-gray-400">VIP Members</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
