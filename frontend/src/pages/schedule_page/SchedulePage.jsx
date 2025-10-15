import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin, Filter, Search } from "lucide-react";
import HeroSection from "../../components/hero";

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

  useEffect(() => {
    const fetchSchedules = async () => {
      setTimeout(() => {
        setSchedules([
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
        ]);
        setLoading(false);
      }, 1000);
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
      <div className="pt-20 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <HeroSection
        title="Class Schedule"
        subtitle=" Find the perfect class that fits your schedule and fitness goals."
        backgroundImage="../../assets/images/bg.jpeg"
      />

      {/* Filters */}
      <section className="py-12 bg-black border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="section bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchedules.map((schedule, index) => (
              <motion.div
                key={schedule._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {schedule.title}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      schedule.difficulty === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : schedule.difficulty === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {schedule.difficulty}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{schedule.dayOfWeek}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {schedule.startTime} - {schedule.endTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{schedule.room}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {schedule.currentParticipants}/{schedule.maxParticipants}{" "}
                      participants
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Trainer</p>
                  <p className="font-medium text-gray-800">
                    {schedule.trainer.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {schedule.trainer.specialization}
                  </p>
                </div>

                <button className="btn-primary w-full">Book Class</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SchedulePage;
