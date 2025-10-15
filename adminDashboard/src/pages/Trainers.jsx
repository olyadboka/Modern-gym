import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  UserCheck, 
  UserX,
  Award,
  Users,
  Star
} from 'lucide-react';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data - in production, this would come from your API
  useEffect(() => {
    const fetchTrainers = async () => {
      // Simulate API call
      setTimeout(() => {
        setTrainers([
          {
            _id: '1',
            name: 'Sarah Johnson',
            specialization: 'Strength Training',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
            experience: '8 years',
            rating: 4.9,
            clients: 150,
            isActive: true,
            socialLinks: {
              facebook: '#',
              instagram: '#',
              twitter: '#'
            }
          },
          {
            _id: '2',
            name: 'Mike Chen',
            specialization: 'Cardio & HIIT',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
            experience: '6 years',
            rating: 4.8,
            clients: 120,
            isActive: true,
            socialLinks: {
              facebook: '#',
              instagram: '#',
              twitter: '#'
            }
          },
          {
            _id: '3',
            name: 'Emily Rodriguez',
            specialization: 'Yoga & Pilates',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
            experience: '10 years',
            rating: 4.9,
            clients: 200,
            isActive: true,
            socialLinks: {
              facebook: '#',
              instagram: '#',
              twitter: '#'
            }
          }
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchTrainers();
  }, []);

  const specializations = [
    'Strength Training',
    'Cardio & HIIT',
    'Yoga & Pilates',
    'Functional Training',
    'Nutrition & Wellness',
    'Sports Performance'
  ];

  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = filterSpecialization === 'all' || trainer.specialization === filterSpecialization;
    
    return matchesSearch && matchesSpecialization;
  });

  const handleToggleStatus = (trainerId) => {
    setTrainers(trainers.map(trainer => 
      trainer._id === trainerId 
        ? { ...trainer, isActive: !trainer.isActive }
        : trainer
    ));
  };

  const handleDeleteTrainer = (trainerId) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      setTrainers(trainers.filter(trainer => trainer._id !== trainerId));
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Trainers Management</h1>
          <p className="text-gray-600">Manage gym trainers and their profiles</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="admin-btn-primary mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Trainer</span>
        </button>
      </div>

      {/* Filters */}
      <div className="admin-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-input pl-10"
            />
          </div>

          {/* Specialization Filter */}
          <select
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="admin-input"
          >
            <option value="all">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <span>Total: {trainers.length}</span>
            <span>Active: {trainers.filter(t => t.isActive).length}</span>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <div key={trainer._id} className="admin-card overflow-hidden">
            {/* Trainer Image */}
            <div className="relative">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-bold text-gray-800">{trainer.rating}</span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className={getStatusBadge(trainer.isActive)}>
                  {trainer.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>

            {/* Trainer Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{trainer.name}</h3>
              <p className="text-primary-600 font-semibold mb-4">{trainer.specialization}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full mx-auto mb-2">
                    <Award className="w-5 h-5 text-primary-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">{trainer.experience}</p>
                  <p className="text-xs text-gray-600">Experience</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full mx-auto mb-2">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">{trainer.clients}</p>
                  <p className="text-xs text-gray-600">Clients</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-full mx-auto mb-2">
                    <Star className="w-5 h-5 text-primary-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">{trainer.rating}</p>
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="admin-btn-secondary flex-1 flex items-center justify-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="admin-btn-primary flex-1 flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleToggleStatus(trainer._id)}
                  className={`p-2 rounded-lg ${
                    trainer.isActive 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                  title={trainer.isActive ? 'Deactivate' : 'Activate'}
                >
                  {trainer.isActive ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => handleDeleteTrainer(trainer._id)}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTrainers.length === 0 && (
        <div className="admin-card p-12 text-center">
          <p className="text-gray-500 text-lg">No trainers found matching your criteria.</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-btn-primary mt-4"
          >
            Add Your First Trainer
          </button>
        </div>
      )}

      {/* Add Trainer Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Trainer</h3>
            <p className="text-gray-600 mb-6">Trainer form would go here...</p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowAddModal(false)}
                className="admin-btn-secondary flex-1"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowAddModal(false)}
                className="admin-btn-primary flex-1"
              >
                Add Trainer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trainers;
