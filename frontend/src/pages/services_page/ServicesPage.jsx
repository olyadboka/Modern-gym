import React from "react";
import { motion } from "framer-motion";
import {
  Dumbbell,
  Heart,
  Users,
  Clock,
  Award,
  Zap,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import HeroSection from "../../components/hero";

const ServicesPage = () => {
  const services = [
    {
      icon: Dumbbell,
      title: "Personal Training",
      description:
        "One-on-one training sessions with certified personal trainers tailored to your fitness goals.",
      features: [
        "Customized workout plans",
        "Nutrition guidance",
        "Progress tracking",
        "Flexible scheduling",
      ],
      price: "From $80/session",
    },
    {
      icon: Users,
      title: "Group Classes",
      description:
        "Join our energetic group fitness classes designed for all fitness levels.",
      features: [
        "Variety of class types",
        "Experienced instructors",
        "Motivating atmosphere",
        "All fitness levels welcome",
      ],
      price: "Included in membership",
    },
    {
      icon: Heart,
      title: "Cardio Training",
      description:
        "State-of-the-art cardio equipment and programs to improve your cardiovascular health.",
      features: [
        "Latest cardio machines",
        "HIIT programs",
        "Heart rate monitoring",
        "Personalized programs",
      ],
      price: "Included in membership",
    },
    {
      icon: Award,
      title: "Strength Training",
      description:
        "Comprehensive strength training programs using modern equipment and techniques.",
      features: [
        "Free weights & machines",
        "Functional training",
        "Powerlifting area",
        "Expert guidance",
      ],
      price: "Included in membership",
    },
    {
      icon: Zap,
      title: "HIIT & CrossFit",
      description:
        "High-intensity interval training and CrossFit workouts for maximum results.",
      features: [
        "High-intensity workouts",
        "Varied routines",
        "Community support",
        "Scalable difficulty",
      ],
      price: "From $15/class",
    },
    {
      icon: Clock,
      title: "Flexibility & Recovery",
      description:
        "Yoga, Pilates, and recovery sessions to improve flexibility and reduce stress.",
      features: [
        "Yoga classes",
        "Pilates sessions",
        "Stretching programs",
        "Recovery tools",
      ],
      price: "From $20/class",
    },
  ];

  const additionalServices = [
    {
      title: "Nutrition Counseling",
      description:
        "Professional nutrition guidance to complement your fitness journey.",
      icon: "🥗",
    },
    {
      title: "Locker Rooms",
      description: "Clean, spacious locker rooms with showers and amenities.",
      icon: "🚿",
    },
    {
      title: "Parking",
      description: "Free parking available for all members.",
      icon: "🅿️",
    },
    {
      title: "WiFi",
      description: "Free high-speed WiFi throughout the facility.",
      icon: "📶",
    },
    {
      title: "Childcare",
      description: "Safe childcare services while you work out.",
      icon: "👶",
    },
    {
      title: "Supplements",
      description: "Quality supplements and protein shakes available.",
      icon: "💊",
    },
  ];

  return (
    <div className="pt-20 bg-black">
      {/* Hero Section */}
      <HeroSection
        title="Our Services"
        subtitle="Discover our comprehensive range of fitness services designed to help you achieve your health and wellness goals."
        backgroundImage="../../assets/images/bg.jpeg"
      />

      {/* Main Services */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Fitness Services
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional fitness services tailored to meet your individual
              needs and goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-2xl shadow-lg p-8 group hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-white text-center">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-center">
                  {service.description}
                </p>

                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <p className="text-lg font-bold text-blue-400 mb-4">
                    {service.price}
                  </p>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">
              Additional Amenities
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Extra services and amenities to enhance your gym experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Why Choose Our Services?
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                Our comprehensive fitness services are designed to provide you
                with everything you need to achieve your health and wellness
                goals. From personalized training to group classes, we offer a
                complete fitness solution.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300">
                    Certified and experienced trainers
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300">
                    State-of-the-art equipment
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300">
                    Supportive community environment
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-gray-300">
                    Flexible scheduling options
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Gym Services"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-gray-900 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">50+ Classes</h4>
                    <p className="text-gray-400">Weekly</p>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community and experience the best fitness services in
              town. Your transformation starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/membership"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                View Memberships
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors duration-200"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
