import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Eye, Save, X } from "lucide-react";
import { serviceAPI } from "../utils/api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
    features: [""],
    price: "",
    category: "Personal Training",
    order: 0,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await serviceAPI.getServices();
      if (response.data.success) {
        setServices(response.data.services || []);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Personal Training",
    "Group Classes",
    "Cardio Training",
    "Strength Training",
    "HIIT & CrossFit",
    "Flexibility & Recovery",
  ];

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFeature = () => {
    setNewService({
      ...newService,
      features: [...newService.features, ""],
    });
  };

  const handleRemoveFeature = (index) => {
    setNewService({
      ...newService,
      features: newService.features.filter((_, i) => i !== index),
    });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...newService.features];
    newFeatures[index] = value;
    setNewService({
      ...newService,
      features: newFeatures,
    });
  };

  const handleSaveService = async () => {
    if (editingService) {
      await handleUpdateService(editingService._id, newService);
    } else {
      await handleAddService(newService);
    }
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
      order: service.order,
    });
    setShowAddModal(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        const response = await serviceAPI.deleteService(serviceId);
        if (response.data.success) {
          setServices(services.filter((s) => s._id !== serviceId));
        }
      } catch (error) {
        console.error("Error deleting service:", error);
      }
    }
  };

  const handleAddService = async (serviceData) => {
    try {
      const response = await serviceAPI.createService(serviceData);
      if (response.data.success) {
        setServices([...services, response.data.service]);
        setShowAddModal(false);
        setNewService({
          title: "",
          description: "",
          icon: "",
          features: [""],
          price: "",
          category: "Personal Training",
          order: 0,
        });
      }
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleUpdateService = async (serviceId, serviceData) => {
    try {
      const response = await serviceAPI.updateService(serviceId, serviceData);
      if (response.data.success) {
        setServices(
          services.map((service) =>
            service._id === serviceId ? response.data.service : service
          )
        );
        setShowAddModal(false);
        setEditingService(null);
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
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
          <h1 className="text-3xl font-bold text-white">Services Management</h1>
          <p className="text-gray-400">
            Manage gym services displayed on the website
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  {service.title}
                </h3>
                <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {service.category}
                </span>
              </div>

              <p className="text-gray-400 mb-4">{service.description}</p>

              <div className="space-y-2 mb-4">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
                {service.features.length > 3 && (
                  <span className="text-sm text-gray-500">
                    +{service.features.length - 3} more
                  </span>
                )}
              </div>

              <p className="text-lg font-bold text-blue-400 mb-4">
                {service.price}
              </p>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditService(service)}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2 border border-gray-700"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteService(service._id)}
                  className="px-4 py-2 bg-red-900 text-red-400 rounded-lg hover:bg-red-800 transition-colors border border-red-800"
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
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingService(null);
                }}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newService.title}
                  onChange={(e) =>
                    setNewService({ ...newService, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="Service title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                  rows="3"
                  placeholder="Service description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={newService.icon}
                    onChange={(e) =>
                      setNewService({ ...newService, icon: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                    placeholder="Icon name (e.g., Dumbbell)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={newService.category}
                    onChange={(e) =>
                      setNewService({ ...newService, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
                  >
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-gray-800"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({ ...newService, price: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="e.g., From $80/session"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Features
                </label>
                {newService.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400 flex-1"
                      placeholder="Feature description"
                    />
                    <button
                      onClick={() => handleRemoveFeature(index)}
                      className="p-2 text-red-400 hover:bg-red-900 rounded-lg border border-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddFeature}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 border border-gray-700 text-sm"
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
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveService}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2"
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
