import React, { useState, useEffect } from "react";
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
  Star,
} from "lucide-react";
import { trainerAPI } from "../utils/api";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await trainerAPI.getTrainers();
      if (response.data.success) {
        setTrainers(response.data.trainers || []);
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
      setLoading(false);
    }
  };

  const specializations = [
    "Strength Training",
    "Cardio & HIIT",
    "Yoga & Pilates",
    "Functional Training",
    "Nutrition & Wellness",
    "Sports Performance",
  ];

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      filterSpecialization === "all" ||
      trainer.specialization === filterSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  const handleToggleStatus = async (trainerId) => {
    try {
      const trainer = trainers.find((t) => t._id === trainerId);
      const newStatus = !trainer.isActive;

      const response = await trainerAPI.updateTrainer(trainerId, {
        isActive: newStatus,
      });
      if (response.data.success) {
        setTrainers(
          trainers.map((t) =>
            t._id === trainerId ? { ...t, isActive: newStatus } : t
          )
        );
      }
    } catch (error) {
      console.error("Error updating trainer status:", error);
    }
  };

  const handleDeleteTrainer = async (trainerId) => {
    if (window.confirm("Are you sure you want to delete this trainer?")) {
      try {
        const response = await trainerAPI.deleteTrainer(trainerId);
        if (response.data.success) {
          setTrainers(trainers.filter((trainer) => trainer._id !== trainerId));
        }
      } catch (error) {
        console.error("Error deleting trainer:", error);
      }
    }
  };

  const handleAddTrainer = async (trainerData) => {
    try {
      const response = await trainerAPI.createTrainer(trainerData);
      if (response.data.success) {
        setTrainers([...trainers, response.data.trainer]);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error("Error adding trainer:", error);
    }
  };

  const handleEditTrainer = async (trainerId, trainerData) => {
    try {
      const response = await trainerAPI.updateTrainer(trainerId, trainerData);
      if (response.data.success) {
        setTrainers(
          trainers.map((trainer) =>
            trainer._id === trainerId ? response.data.trainer : trainer
          )
        );
      }
    } catch (error) {
      console.error("Error updating trainer:", error);
    }
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
          <h1 className="text-3xl font-bold text-white">Trainers Management</h1>
          <p className="text-gray-400">
            Manage gym trainers and their profiles
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Trainer</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
            />
          </div>

          {/* Specialization Filter */}
          <select
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
          >
            <option value="all" className="bg-gray-800">
              All Specializations
            </option>
            {specializations.map((spec) => (
              <option key={spec} value={spec} className="bg-gray-800">
                {spec}
              </option>
            ))}
          </select>

          {/* Stats */}
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>Total: {trainers.length}</span>
            <span>Active: {trainers.filter((t) => t.isActive).length}</span>
          </div>
        </div>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Trainer Image */}
            <div className="relative">
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 flex items-center space-x-1 bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-bold text-white">
                  {trainer.rating}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(trainer.isActive)}`}
                >
                  {trainer.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Trainer Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {trainer.name}
              </h3>
              <p className="text-blue-400 font-semibold mb-4">
                {trainer.specialization}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-900 rounded-full mx-auto mb-2">
                    <Award className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm font-bold text-white">
                    {trainer.experience}
                  </p>
                  <p className="text-xs text-gray-400">Experience</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-900 rounded-full mx-auto mb-2">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm font-bold text-white">
                    {trainer.clients}
                  </p>
                  <p className="text-xs text-gray-400">Clients</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-900 rounded-full mx-auto mb-2">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-sm font-bold text-white">
                    {trainer.rating}
                  </p>
                  <p className="text-xs text-gray-400">Rating</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2 border border-gray-700">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center space-x-4 mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={() => handleToggleStatus(trainer._id)}
                  className={`p-2 rounded-lg border transition-colors ${
                    trainer.isActive
                      ? "text-red-400 hover:bg-red-900 border-red-800"
                      : "text-green-400 hover:bg-green-900 border-green-800"
                  }`}
                  title={trainer.isActive ? "Deactivate" : "Activate"}
                >
                  {trainer.isActive ? (
                    <UserX className="w-5 h-5" />
                  ) : (
                    <UserCheck className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => handleDeleteTrainer(trainer._id)}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-900 border border-red-800 transition-colors"
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
        <div className="bg-gray-900 rounded-2xl shadow-lg p-12 text-center border border-gray-800">
          <p className="text-gray-400 text-lg">
            No trainers found matching your criteria.
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4"
          >
            Add Your First Trainer
          </button>
        </div>
      )}

      {/* Add Trainer Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-4">
              Add New Trainer
            </h3>
            <p className="text-gray-400 mb-6">Trainer form would go here...</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 border border-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1"
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
