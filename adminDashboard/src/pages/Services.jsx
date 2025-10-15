import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Save,
  X
} from 'lucide-react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    title: '',
    description: '',
    icon: '',
    features: [''],
    price: '',
    category: 'Personal Training',
    order: 0
  });

  // Mock data - in production, this would come from your API
  useEffect(() => {
    const fetchServices = async () => {
      setTimeout(() => {
        setServices([
          {
            _id: '1',
            title: 'Personal Training',
            description: 'One-on-one training sessions with certified personal trainers tailored to your fitness goals.',
            icon: 'Dumbbell',
            features: ['Customized workout plans', 'Nutrition guidance', 'Progress tracking', 'Flexible scheduling'],
            price: 'From $80/session',
            category: 'Personal Training',
            order: 1,
            isActive: true
          },
          {
            _id: '2',
            title: 'Group Classes',
            description: 'Join our energetic group fitness classes designed for all fitness levels.',
            icon: 'Users',
            features: ['Variety of class types', 'Experienced instructors', 'Motivating atmosphere', 'All fitness levels welcome'],
            price: 'Included in membership',
            category: 'Group Classes',
            order: 2,
            isActive: true
          }
        ]);
        setLoading(false);
      }, 1000);
    };
    fetchServices();
  }, []);

  const categories = [
    'Personal Training',
    'Group Classes', 
    'Cardio Training',
    'Strength Training',
    'HIIT & CrossFit',
    'Flexibility & Recovery'
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFeature = () => {
    setNewService({
      ...newService,
      features: [...newService.features, '']
    });
  };

  const handleRemoveFeature = (index) => {
    setNewService({
      ...newService,
      features: newService.features.filter((_, i) => i !== index)
    });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...newService.features];
    newFeatures[index] = value;
    setNewService({
      ...newService,
      features: newFeatures
    });
  };

  const handleSaveService = () => {
    if (editingService) {
      setServices(services.map(s => s._id === editingService._id ? { ...editingService, ...newService } : s));
      setEditingService(null);
    } else {
      const service = {
        _id: Date.now().toString(),
        ...newService,
        isActive: true
      };
      setServices([...services, service]);
    }
    setShowAddModal(false);
    setNewService({
      title: '',
      description: '',
      icon: '',
      features: [''],
      price: '',
      category: 'Personal Training',
      order: 0
    });
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features,
      price: service.price,
      category: service.category,
      order: service.order
    });
    setShowAddModal(true);
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s._id !== serviceId));
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600">Manage gym services displayed on the website</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="admin-btn-primary mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="admin-card p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service._id} className="admin-card">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                <span className="admin-badge admin-badge-info">{service.category}</span>
              </div>
              
              <p className="text-gray-600 mb-4">{service.description}</p>
              
              <div className="space-y-2 mb-4">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <span className="text-sm text-gray-500">+{service.features.length - 3} more</span>
                )}
              </div>
              
              <p className="text-lg font-bold text-primary-600 mb-4">{service.price}</p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditService(service)}
                  className="admin-btn-secondary flex-1 flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingService(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) => setNewService({...newService, title: e.target.value})}
                  className="admin-input"
                  placeholder="Service title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  className="admin-input"
                  rows="3"
                  placeholder="Service description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                  <input
                    type="text"
                    value={newService.icon}
                    onChange={(e) => setNewService({...newService, icon: e.target.value})}
                    className="admin-input"
                    placeholder="Icon name (e.g., Dumbbell)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({...newService, category: e.target.value})}
                    className="admin-input"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                  className="admin-input"
                  placeholder="e.g., From $80/session"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                {newService.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="admin-input flex-1"
                      placeholder="Feature description"
                    />
                    <button
                      onClick={() => handleRemoveFeature(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddFeature}
                  className="admin-btn-secondary text-sm"
                >
                  Add Feature
                </button>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingService(null);
                  }}
                  className="admin-btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveService}
                  className="admin-btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Service</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
