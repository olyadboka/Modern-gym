import React, { useState, useEffect } from 'react';
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
  Calendar
} from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterMembership, setFilterMembership] = useState('all');

  // Mock data - in production, this would come from your API
  useEffect(() => {
    const fetchUsers = async () => {
      // Simulate API call
      setTimeout(() => {
        setUsers([
          {
            _id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            role: 'user',
            membershipType: 'premium',
            joinDate: '2024-01-15',
            isActive: true
          },
          {
            _id: '2',
            name: 'Sarah Smith',
            email: 'sarah@example.com',
            phone: '+1 (555) 234-5678',
            role: 'user',
            membershipType: 'vip',
            joinDate: '2024-02-20',
            isActive: true
          },
          {
            _id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            phone: '+1 (555) 345-6789',
            role: 'user',
            membershipType: 'basic',
            joinDate: '2024-03-10',
            isActive: false
          },
          {
            _id: '4',
            name: 'Emily Davis',
            email: 'emily@example.com',
            phone: '+1 (555) 456-7890',
            role: 'coach',
            membershipType: 'premium',
            joinDate: '2023-12-05',
            isActive: true
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesMembership = filterMembership === 'all' || user.membershipType === filterMembership;
    
    return matchesSearch && matchesRole && matchesMembership;
  });

  const handleToggleStatus = (userId) => {
    setUsers(users.map(user => 
      user._id === userId 
        ? { ...user, isActive: !user.isActive }
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user._id !== userId));
    }
  };

  const getMembershipBadge = (type) => {
    const badges = {
      basic: 'admin-badge admin-badge-info',
      premium: 'admin-badge admin-badge-warning',
      vip: 'admin-badge admin-badge-success'
    };
    return badges[type] || 'admin-badge admin-badge-info';
  };

  const getStatusBadge = (isActive) => {
    return isActive 
      ? 'admin-badge admin-badge-success'
      : 'admin-badge admin-badge-error';
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage gym members and their accounts</p>
        </div>
        <button className="admin-btn-primary mt-4 sm:mt-0">
          Add New User
        </button>
      </div>

      {/* Filters */}
      <div className="admin-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Roles</option>
            <option value="user">Members</option>
            <option value="coach">Coaches</option>
            <option value="admin">Admins</option>
          </select>

          {/* Membership Filter */}
          <select
            value={filterMembership}
            onChange={(e) => setFilterMembership(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Memberships</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>

          {/* Filter Button */}
          <button className="admin-btn-secondary flex items-center justify-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact</th>
                <th>Role</th>
                <th>Membership</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{user.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="admin-badge admin-badge-info capitalize">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`${getMembershipBadge(user.membershipType)} capitalize`}>
                      {user.membershipType}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={getStatusBadge(user.isActive)}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        className={`p-2 rounded-lg ${
                          user.isActive 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={user.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </button>
                      <button
                        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 rounded-lg text-red-600 hover:bg-red-50"
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
            <p className="text-gray-500">No users found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="admin-card p-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900">{users.length}</h3>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="admin-card p-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {users.filter(u => u.isActive).length}
          </h3>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div className="admin-card p-6 text-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {users.filter(u => u.role === 'coach').length}
          </h3>
          <p className="text-gray-600">Coaches</p>
        </div>
        <div className="admin-card p-6 text-center">
          <h3 className="text-2xl font-bold text-purple-600">
            {users.filter(u => u.membershipType === 'vip').length}
          </h3>
          <p className="text-gray-600">VIP Members</p>
        </div>
      </div>
    </div>
  );
};

export default Users;
