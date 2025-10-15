import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Clock,
  CheckCircle,
  Dumbbell,
  Zap,
} from "lucide-react";
import HeroSection from "../../components/hero";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="pt-20 bg-black">
      {" "}
      {/* Hero Section */}
      <HeroSection
        title="About FitFat Gym"
        subtitle=" We're more than just a gym - we're a community dedicated to helping you achieve your fitness goals and live your best life."
        backgroundImage="../../assets/images/bg.jpeg"
      />
      {/* Story Section */}
      <section className="section bg-black text-white">
        {" "}
        {/* Changed to black background and white text */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                {" "}
                {/* Changed to white */}
                Our Story
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {" "}
                {/* Changed to gray-300 */}
                Founded in 2010, FitFat Gym began as a small fitness studio with
                a big dream: to create a welcoming space where everyone,
                regardless of their fitness level, could pursue their health and
                wellness goals.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                {" "}
                {/* Changed to gray-300 */}
                What started as a passion project has grown into a thriving
                community of over 5,000 members. Our success comes from our
                commitment to providing personalized attention, cutting-edge
                equipment, and a supportive environment that motivates everyone
                to be their best.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                {" "}
                {/* Changed to gray-300 */}
                Today, we continue to evolve and innovate, always striving to
                offer the best fitness experience possible while maintaining the
                warm, community-focused atmosphere that makes FitFat Gym
                special.
              </p>
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
                alt="Gym Interior"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-black border border-gray-700 rounded-2xl p-6 shadow-xl">
                {" "}
                {/* Changed to black with border */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">15+ Years</h4>{" "}
                    {/* Changed to white */}
                    <p className="text-gray-300">Of Excellence</p>{" "}
                    {/* Changed to gray-300 */}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Mission, Vision, Values */}
      <section className="section bg-gray-900">
        {" "}
        {/* Changed to gray-900 (darker gray) */}
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card text-center bg-gray-800 border border-gray-700" // Added dark background and border
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {" "}
                {/* Changed to white */}
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {" "}
                {/* Changed to gray-300 */}
                To empower individuals to achieve their fitness goals through
                personalized training, state-of-the-art equipment, and a
                supportive community that inspires lasting lifestyle changes.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card text-center bg-gray-800 border border-gray-700" // Added dark background and border
            >
              <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {" "}
                {/* Changed to white */}
                Our Vision
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {" "}
                {/* Changed to gray-300 */}
                To be the premier fitness destination where every member feels
                valued, motivated, and equipped to reach their full potential in
                health, fitness, and life.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card text-center bg-gray-800 border border-gray-700" // Added dark background and border
            >
              <div className="w-16 h-16 bg-gradient-dark rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {" "}
                {/* Changed to white */}
                Our Values
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {" "}
                {/* Changed to gray-300 */}
                Integrity, inclusivity, excellence, and community are the core
                values that guide everything we do at FitFat Gym.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="section bg-black text-white">
        {" "}
        {/* Changed to black background and white text */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2 className="text-white">Why Choose FitFat Gym?</h2>{" "}
            {/* Added text-white */}
            <p className="text-gray-300">
              {" "}
              {/* Changed to gray-300 */}
              Discover what makes us the preferred choice for fitness
              enthusiasts in our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Team",
                description:
                  "Certified trainers with years of experience and passion for helping you succeed.",
              },
              {
                icon: Dumbbell,
                title: "Premium Equipment",
                description:
                  "Latest fitness equipment from top brands to enhance your workout experience.",
              },
              {
                icon: Clock,
                title: "Flexible Schedule",
                description:
                  "Open 7 days a week with extended hours to fit your busy lifestyle.",
              },
              {
                icon: Zap,
                title: "Variety of Classes",
                description:
                  "From high-intensity training to yoga, we offer classes for every fitness level.",
              },
              {
                icon: Heart,
                title: "Community Support",
                description:
                  "Join a supportive community that motivates and encourages your fitness journey.",
              },
              {
                icon: Award,
                title: "Proven Results",
                description:
                  "Thousands of success stories from members who achieved their goals with us.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group bg-gray-900 p-6 rounded-2xl border border-gray-800" // Added dark background and border
              >
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {" "}
                  {/* Changed to white */}
                  {item.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {" "}
                  {/* Changed to gray-300 */}
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="section bg-gray-900 text-white">
        {" "}
        {/* Changed to gray-900 and white text */}
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2 className="text-white">Meet Our Leadership Team</h2>{" "}
            {/* Added text-white */}
            <p className="text-gray-300">
              {" "}
              {/* Changed to gray-300 */}
              The passionate professionals who make FitFat Gym an exceptional
              place to train.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "Founder & CEO",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
                bio: "15+ years in fitness industry, certified personal trainer, and passionate about helping people achieve their goals.",
              },
              {
                name: "Sarah Johnson",
                role: "Head Trainer",
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
                bio: "Specialized in strength training and nutrition, with a Master's degree in Exercise Science.",
              },
              {
                name: "Mike Chen",
                role: "Operations Manager",
                image:
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
                bio: "Ensures smooth operations and maintains the highest standards of facility maintenance and member service.",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center bg-gray-800 border border-gray-700" // Added dark background and border
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {" "}
                  {/* Changed to white */}
                  {member.name}
                </h3>
                <p className="text-primary-400 font-semibold mb-4">
                  {" "}
                  {/* Changed to primary-400 for better contrast */}
                  {member.role}
                </p>
                <p className="text-gray-300 leading-relaxed">{member.bio}</p>{" "}
                {/* Changed to gray-300 */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="section bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "5000+", label: "Happy Members" },
              { number: "50+", label: "Expert Trainers" },
              { number: "100+", label: "Classes Weekly" },
              { number: "15+", label: "Years Experience" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </h3>
                <p className="text-lg text-primary-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="section bg-gradient-secondary">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Become part of the FitFat family and start your transformation
              journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-white text-secondary-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Join Now
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-secondary-600 transition-colors duration-200"
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

export default AboutPage;
