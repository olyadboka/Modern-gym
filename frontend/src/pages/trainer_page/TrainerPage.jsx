import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Award,
  Users,
  Clock,
  Dumbbell,
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Filter,
} from "lucide-react";
import HeroSection from "../../components/hero";

const TrainerPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [trainers, setTrainers] = useState([]);

  // Mock data - in real app, this would come from your backend
  const mockTrainers = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialization: "Strength Training",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      experience: "8 years",
      rating: 4.9,
      clients: 150,
      bio: "Sarah is a certified strength and conditioning specialist with a passion for helping clients build functional strength and confidence.",
      specialties: ["Weight Training", "Powerlifting", "Bodybuilding"],
      certifications: ["CSCS", "NASM-CPT", "Olympic Lifting"],
      socialLinks: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
      availability: "Mon-Fri: 6AM-8PM, Sat: 8AM-6PM",
    },
    {
      id: 2,
      name: "Mike Chen",
      specialization: "Cardio & HIIT",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      experience: "6 years",
      rating: 4.8,
      clients: 120,
      bio: "Mike specializes in high-intensity interval training and cardiovascular fitness, helping clients achieve their weight loss and endurance goals.",
      specialties: ["HIIT", "Cardio", "Weight Loss"],
      certifications: ["ACSM-CPT", "HIIT Specialist"],
      socialLinks: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
      availability: "Mon-Fri: 5AM-9PM, Sun: 9AM-5PM",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      specialization: "Yoga & Pilates",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      experience: "10 years",
      rating: 4.9,
      clients: 200,
      bio: "Emily is a certified yoga instructor and Pilates specialist, focusing on flexibility, balance, and mindful movement.",
      specialties: ["Yoga", "Pilates", "Flexibility", "Mindfulness"],
      certifications: ["RYT-500", "PMA-CPT", "Yin Yoga"],
      socialLinks: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
      availability: "Tue-Thu: 7AM-7PM, Sat-Sun: 9AM-4PM",
    },
    {
      id: 4,
      name: "David Thompson",
      specialization: "Functional Training",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      experience: "12 years",
      rating: 4.9,
      clients: 180,
      bio: "David focuses on functional movement patterns and injury prevention, helping clients move better in their daily lives.",
      specialties: ["Functional Training", "Injury Prevention", "Mobility"],
      certifications: ["FMS", "CES", "TRX"],
      socialLinks: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
      availability: "Mon-Fri: 6AM-8PM, Sat: 7AM-5PM",
    },
    {
      id: 5,
      name: "Jessica Park",
      specialization: "Nutrition & Wellness",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      experience: "7 years",
      rating: 4.8,
      clients: 100,
      bio: "Jessica combines fitness training with nutrition counseling to provide comprehensive wellness solutions for her clients.",
      specialties: ["Nutrition", "Weight Management", "Wellness Coaching"],
      certifications: ["RD", "NASM-CPT", "Precision Nutrition"],
      socialLinks: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
      availability: "Mon-Wed-Fri: 8AM-6PM, Sat: 10AM-4PM",
    },
    {
      id: 6,
      name: "Alex Martinez",
      specialization: "Sports Performance",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
      experience: "9 years",
      rating: 4.9,
      clients: 90,
      bio: "Alex works with athletes and sports enthusiasts to improve performance, speed, and agility through specialized training programs.",
      specialties: ["Sports Performance", "Speed Training", "Agility"],
      certifications: ["CSCS", "USAW", "Speed & Agility"],
      socialLinks: {
        instagram: "#",
        facebook: "#",
        twitter: "#",
      },
      availability: "Mon-Fri: 5AM-7PM, Sat: 8AM-2PM",
    },
  ];

  const specialties = [
    { value: "all", label: "All Trainers" },
    { value: "Strength Training", label: "Strength Training" },
    { value: "Cardio & HIIT", label: "Cardio & HIIT" },
    { value: "Yoga & Pilates", label: "Yoga & Pilates" },
    { value: "Functional Training", label: "Functional Training" },
    { value: "Nutrition & Wellness", label: "Nutrition & Wellness" },
    { value: "Sports Performance", label: "Sports Performance" },
  ];

  useEffect(() => {
    setTrainers(mockTrainers);
  }, []);

  const filteredTrainers =
    selectedSpecialty === "all"
      ? trainers
      : trainers.filter(
          (trainer) => trainer.specialization === selectedSpecialty
        );

  return (
    <div className="pt-20 bg-black">
      {/* Hero Section */}
      <HeroSection
        title="Meet Our Trainers"
        subtitle="Our certified fitness professionals are here to guide you on your journey to better health and fitness."
        backgroundImage="trainerbg.jpeg"
      />

      {/* Filter Section */}
      <section className="py-12 bg-black border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {specialties.map((specialty) => (
              <button
                key={specialty.value}
                onClick={() => setSelectedSpecialty(specialty.value)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedSpecialty === specialty.value
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {specialty.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrainers.map((trainer, index) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl shadow-lg p-6 group hover:shadow-xl transition-shadow duration-300"
              >
                {/* Trainer Image */}
                <div className="relative mb-6">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-white">
                      {trainer.rating}
                    </span>
                  </div>
                </div>

                {/* Trainer Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {trainer.name}
                  </h3>
                  <p className="text-blue-400 font-semibold mb-3">
                    {trainer.specialization}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {trainer.bio}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-sm font-bold text-white">
                      {trainer.experience}
                    </p>
                    <p className="text-xs text-gray-400">Experience</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-sm font-bold text-white">
                      {trainer.clients}
                    </p>
                    <p className="text-xs text-gray-400">Clients</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Star className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-sm font-bold text-white">
                      {trainer.rating}
                    </p>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-3 flex items-center">
                    <Dumbbell className="w-4 h-4 mr-2 text-blue-400" />
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-900 text-blue-300 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-purple-400" />
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-xs font-medium"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <h4 className="font-bold text-white mb-2 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-green-400" />
                    Availability
                  </h4>
                  <p className="text-sm text-gray-400">
                    {trainer.availability}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center space-x-4 mb-6">
                  <a
                    href={trainer.socialLinks.instagram}
                    className="p-2 bg-gray-800 text-pink-400 rounded-full hover:bg-pink-600 hover:text-white transition-colors duration-200"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={trainer.socialLinks.facebook}
                    className="p-2 bg-gray-800 text-blue-400 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={trainer.socialLinks.twitter}
                    className="p-2 bg-gray-800 text-blue-300 rounded-full hover:bg-blue-400 hover:text-white transition-colors duration-200"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${trainer.name.toLowerCase().replace(" ", ".")}@fitfatgym.com`}
                    className="p-2 bg-gray-800 text-gray-400 rounded-full hover:bg-gray-600 hover:text-white transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-200 text-sm">
                    Book Session
                  </button>
                  <button className="px-4 py-3 border-2 border-blue-500 text-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-colors duration-200">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Work with Our Trainers?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book a consultation with any of our certified trainers and start
              your personalized fitness journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Book Consultation
              </a>
              <a
                href="/signup"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Join Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TrainerPage;
