import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, Filter, Search } from "lucide-react";
import HeroSection from "../../components/hero";
import { scheduleAPI } from "../../utils/api";

const SchedulePage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const categories = [
    "Yoga",
    "Pilates",
    "HIIT",
    "Strength Training",
    "Cardio",
    "Dance",
    "Martial Arts",
  ];

  // Default schedules as fallback
  const defaultSchedules = [
    {
      _id: "1",
      title: "Morning Yoga",
      trainer: {
        name: "Emily Rodriguez",
        specialization: "Yoga & Pilates",
      },
      dayOfWeek: "Monday",
      startTime: "06:00",
      endTime: "07:00",
      maxParticipants: 20,
      currentParticipants: 15,
      room: "Studio A",
      difficulty: "All Levels",
      category: "Yoga",
    },
    {
      _id: "2",
      title: "HIIT Cardio",
      trainer: { name: "Mike Chen", specialization: "Cardio & HIIT" },
      dayOfWeek: "Monday",
      startTime: "18:00",
      endTime: "19:00",
      maxParticipants: 15,
      currentParticipants: 12,
      room: "Main Floor",
      difficulty: "Intermediate",
      category: "HIIT",
    },
    {
      _id: "3",
      title: "Strength Training",
      trainer: {
        name: "Sarah Johnson",
        specialization: "Strength Training",
      },
      dayOfWeek: "Tuesday",
      startTime: "07:00",
      endTime: "08:00",
      maxParticipants: 12,
      currentParticipants: 8,
      room: "Weight Room",
      difficulty: "Advanced",
      category: "Strength Training",
    },
  ];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const response = await scheduleAPI.getSchedules();
        if (response.data.success) {
          setSchedules(response.data.schedules || []);
        } else {
          setSchedules(defaultSchedules);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);

        setSchedules(defaultSchedules);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesDay =
      selectedDay === "all" || schedule.dayOfWeek === selectedDay;
    const matchesCategory =
      selectedCategory === "all" || schedule.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  if (loading) {
    return (
      <div className="pt-20 flex items-center justify-center h-64 bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-black">
      {/* Hero Section */}
      <HeroSection
        title="Class Schedule"
        subtitle="Find the perfect class that fits your schedule and fitness goals."
        backgroundImage="7.jpeg"
      />

      {/* Filters */}
      <section className="py-12 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-colors duration-200"
            >
              <option value="all" className="bg-gray-800">
                All Days
              </option>
              {days.map((day) => (
                <option key={day} value={day} className="bg-gray-800">
                  {day}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-colors duration-200"
            >
              <option value="all" className="bg-gray-800">
                All Categories
              </option>
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {filteredSchedules.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No classes found matching your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchedules.map((schedule, index) => (
                <motion.div
                  key={schedule._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {schedule.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        schedule.difficulty === "All Levels" ||
                        schedule.difficulty === "Beginner"
                          ? "bg-green-900 text-green-300"
                          : schedule.difficulty === "Intermediate"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-red-900 text-red-300"
                      }`}
                    >
                      {schedule.difficulty}
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">
                        {schedule.dayOfWeek}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">{schedule.room}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-300">
                        {schedule.currentParticipants}/
                        {schedule.maxParticipants} participants
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Trainer</p>
                    <p className="font-medium text-white">
                      {schedule.trainer.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {schedule.trainer.specialization}
                    </p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200">
                    Book Class
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;
