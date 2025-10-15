import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  CheckCircle,
} from "lucide-react";
import HeroSection from "../../components/hero";

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Form data:", data);
      setIsSubmitted(true);
      reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="pt-20 bg-black">
      {/* Hero Section */}
      <HeroSection
        title="Contact Us"
        subtitle=" Get in touch with our team. We're here to help you start your fitness journey and answer any questions you may have."
        backgroundImage="../../assets/images/bg.jpeg"
      />

      {/* Contact Information */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Visit Us</h3>
              <p className="text-gray-300">
                123 Fitness Street
                <br />
                Gym City, GC 12345
                <br />
                United States
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Call Us</h3>
              <p className="text-gray-300">
                Main: +1 (555) 123-4567
                <br />
                Support: +1 (555) 123-4568
                <br />
                Fax: +1 (555) 123-4569
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Email Us</h3>
              <p className="text-gray-300">
                info@fitfatgym.com
                <br />
                support@fitfatgym.com
                <br />
                trainers@fitfatgym.com
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-900 rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Send us a Message
                </h2>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-900 border border-green-600 rounded-lg flex items-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300">
                      Thank you! Your message has been sent successfully.
                    </span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                        placeholder="Your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                        placeholder="Your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      {...register("phone")}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white placeholder-gray-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      {...register("subject", {
                        required: "Please select a subject",
                      })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 text-white"
                    >
                      <option value="" className="bg-gray-800">
                        Select a subject
                      </option>
                      <option value="membership" className="bg-gray-800">
                        Membership Inquiry
                      </option>
                      <option value="training" className="bg-gray-800">
                        Personal Training
                      </option>
                      <option value="classes" className="bg-gray-800">
                        Group Classes
                      </option>
                      <option value="equipment" className="bg-gray-800">
                        Equipment Question
                      </option>
                      <option value="billing" className="bg-gray-800">
                        Billing Support
                      </option>
                      <option value="other" className="bg-gray-800">
                        Other
                      </option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none text-white placeholder-gray-400"
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-gray-900 rounded-2xl shadow-lg p-0 overflow-hidden">
                <div className="h-64 bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Interactive Map Coming Soon</p>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-gray-900 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-blue-500" />
                  Operating Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "5:00 AM - 10:00 PM" },
                    { day: "Saturday", hours: "6:00 AM - 8:00 PM" },
                    { day: "Sunday", hours: "6:00 AM - 8:00 PM" },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0"
                    >
                      <span className="font-medium text-gray-300">
                        {schedule.day}
                      </span>
                      <span className="text-gray-400">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gray-900 rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-200"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-200"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Quick answers to common questions about our gym and services.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "What are your membership options?",
                answer:
                  "We offer flexible membership plans including monthly, quarterly, and annual options. We also have student and senior discounts available.",
              },
              {
                question: "Do you offer personal training sessions?",
                answer:
                  "Yes! Our certified personal trainers offer one-on-one sessions tailored to your fitness goals and schedule.",
              },
              {
                question: "What equipment do you have?",
                answer:
                  "We feature state-of-the-art equipment including cardio machines, weight training equipment, functional training areas, and more.",
              },
              {
                question: "Are there group fitness classes?",
                answer:
                  "Absolutely! We offer a variety of group classes including yoga, pilates, HIIT, spinning, and strength training classes.",
              },
              {
                question: "Do you have parking available?",
                answer:
                  "Yes, we provide free parking for all our members in our dedicated parking lot.",
              },
              {
                question: "What safety measures do you have in place?",
                answer:
                  "We maintain high cleanliness standards, provide sanitization stations throughout the facility, and have trained staff available for assistance.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold mb-3 text-white">
                  {faq.question}
                </h4>
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
