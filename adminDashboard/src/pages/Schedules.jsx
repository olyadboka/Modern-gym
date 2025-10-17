import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Clock,
  Users,
  Calendar,
} from "lucide-react";
import { scheduleAPI, trainerAPI } from "../utils/api";

const Schedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDay, setFilterDay] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    trainer: "",
    dayOfWeek: "Monday",
    startTime: "",
    endTime: "",
    maxParticipants: 20,
    room: "",
    difficulty: "All Levels",
    category: "Yoga",
    isActive: true,
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const difficulties = ["Beginner", "Intermediate", "Advanced", "All Levels"];
  const categories = [
    "Yoga",
    "Pilates",
    "HIIT",
    "Strength Training",
    "Cardio",
    "Dance",
    "Martial Arts",
    "Swimming",
  ];

  useEffect(() => {
    fetchAll();
    fetchTrainers();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const res = await scheduleAPI.getSchedules();
      if (res.data.success) setSchedules(res.data.schedules || []);
    } catch (e) {
      console.error("Fetch schedules failed", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await trainerAPI.getTrainers();
      if (res.data.success) setTrainers(res.data.trainers || []);
    } catch (e) {
      console.error("Fetch trainers failed", e);
    }
  };

  const filtered = schedules.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDay = filterDay === "all" || s.dayOfWeek === filterDay;
    const matchesCategory =
      filterCategory === "all" || s.category === filterCategory;
    return matchesSearch && matchesDay && matchesCategory;
  });

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      trainer: "",
      dayOfWeek: "Monday",
      startTime: "",
      endTime: "",
      maxParticipants: 20,
      room: "",
      difficulty: "All Levels",
      category: "Yoga",
      isActive: true,
    });
  };

  const onSave = async () => {
    try {
      if (editing) {
        const res = await scheduleAPI.updateSchedule(editing._id, form);
        if (res.data.success) {
          setSchedules(
            schedules.map((s) =>
              s._id === editing._id ? res.data.schedule : s
            )
          );
          setShowModal(false);
          resetForm();
        }
      } else {
        const res = await scheduleAPI.createSchedule(form);
        if (res.data.success) {
          setSchedules([...schedules, res.data.schedule]);
          setShowModal(false);
          resetForm();
        }
      }
    } catch (e) {
      console.error("Save schedule failed", e);
    }
  };

  const onEdit = (s) => {
    setEditing(s);
    setForm({
      title: s.title,
      description: s.description,
      trainer: s.trainer._id,
      dayOfWeek: s.dayOfWeek,
      startTime: s.startTime,
      endTime: s.endTime,
      maxParticipants: s.maxParticipants,
      room: s.room,
      difficulty: s.difficulty,
      category: s.category,
      isActive: s.isActive,
    });
    setShowModal(true);
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this schedule?")) return;
    try {
      const res = await scheduleAPI.deleteSchedule(id);
      if (res.data.success) setSchedules(schedules.filter((s) => s._id !== id));
    } catch (e) {
      console.error("Delete schedule failed", e);
    }
  };

  const toggleActive = async (id, isActive) => {
    try {
      const res = await scheduleAPI.updateSchedule(id, { isActive: !isActive });
      if (res.data.success) {
        setSchedules(
          schedules.map((s) => (s._id === id ? res.data.schedule : s))
        );
      }
    } catch (e) {
      console.error("Toggle schedule failed", e);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Schedules</h1>
          <p className="text-gray-400">Manage class schedules and sessions</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 sm:mt-0 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Schedule</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schedules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
            />
          </div>
          <select
            value={filterDay}
            onChange={(e) => setFilterDay(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
          >
            <option value="all">All Days</option>
            {days.map((day) => (
              <option key={day} value={day} className="bg-gray-800">
                {day}
              </option>
            ))}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} className="bg-gray-800">
                {category}
              </option>
            ))}
          </select>
          <div className="text-sm text-gray-400 flex items-center">
            {filtered.length} of {schedules.length} schedules
          </div>
        </div>
      </div>

      {/* Schedules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((s) => (
          <div
            key={s._id}
            className="bg-gray-900 rounded-2xl shadow-lg border border-gray-800 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{s.title}</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(s._id, s.isActive)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    s.isActive
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}
                >
                  {s.isActive ? "Active" : "Inactive"}
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{s.dayOfWeek}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span>
                  {s.startTime} - {s.endTime}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="w-4 h-4" />
                <span>
                  {s.currentParticipants || 0}/{s.maxParticipants} participants
                </span>
              </div>
              <div className="text-sm text-gray-400">
                <strong>Trainer:</strong> {s.trainer?.name}
              </div>
              <div className="text-sm text-gray-400">
                <strong>Room:</strong> {s.room}
              </div>
              <div className="text-sm text-gray-400">
                <strong>Difficulty:</strong> {s.difficulty}
              </div>
              <div className="text-sm text-gray-400">
                <strong>Category:</strong> {s.category}
              </div>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {s.description}
            </p>

            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(s)}
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2 border border-gray-700"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete(s._id)}
                className="px-4 py-2 bg-red-900 text-red-400 rounded-lg hover:bg-red-800 transition-colors border border-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editing ? "Edit" : "Add"} Schedule
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                    placeholder="Morning Yoga"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Room
                  </label>
                  <input
                    type="text"
                    value={form.room}
                    onChange={(e) => setForm({ ...form, room: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                    placeholder="Studio A"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="Class description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Day
                  </label>
                  <select
                    value={form.dayOfWeek}
                    onChange={(e) =>
                      setForm({ ...form, dayOfWeek: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
                  >
                    {days.map((day) => (
                      <option key={day} value={day} className="bg-gray-800">
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm({ ...form, startTime: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={form.endTime}
                    onChange={(e) =>
                      setForm({ ...form, endTime: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Trainer
                  </label>
                  <select
                    value={form.trainer}
                    onChange={(e) =>
                      setForm({ ...form, trainer: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
                  >
                    <option value="" className="bg-gray-800">
                      Select Trainer
                    </option>
                    {trainers.map((trainer) => (
                      <option
                        key={trainer._id}
                        value={trainer._id}
                        className="bg-gray-800"
                      >
                        {trainer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={form.difficulty}
                    onChange={(e) =>
                      setForm({ ...form, difficulty: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
                  >
                    {difficulties.map((difficulty) => (
                      <option
                        key={difficulty}
                        value={difficulty}
                        className="bg-gray-800"
                      >
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Participants
                </label>
                <input
                  type="number"
                  value={form.maxParticipants}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      maxParticipants: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="20"
                />
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <input
                  id="active"
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="h-4 w-4 text-blue-600 border-gray-700 bg-gray-800 rounded"
                />
                <label htmlFor="active" className="text-sm text-gray-300">
                  Active Schedule
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex-1 flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedules;
