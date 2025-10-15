import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Star,
  Crown,
  Zap,
  ArrowRight,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import HeroSection from "../../components/hero";

const MembershipPage = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - in production, this would come from your API
  useEffect(() => {
    const fetchMemberships = async () => {
      // Simulate API call
      setTimeout(() => {
        setMemberships([
          {
            _id: "1",
            name: "Basic",
            description:
              "Perfect for beginners who want to start their fitness journey.",
            price: 29,
            duration: "monthly",
            features: [
              "Access to cardio equipment",
              "Basic weight training area",
              "Locker room access",
              "Free WiFi",
              "Gym orientation",
            ],
            isPopular: false,
            maxUsers: null,
            currentUsers: 450,
          },
          {
            _id: "2",
            name: "Premium",
            description:
              "Our most popular membership with access to all facilities and group classes.",
            price: 49,
            duration: "monthly",
            features: [
              "Everything in Basic",
              "All group fitness classes",
              "Access to all equipment",
              "Personal training discount (20%)",
              "Guest passes (2/month)",
              "Nutrition consultation",
              "Priority booking",
            ],
            isPopular: true,
            maxUsers: null,
            currentUsers: 680,
          },
          {
            _id: "3",
            name: "VIP",
            description:
              "Ultimate membership with premium services and exclusive benefits.",
            price: 79,
            duration: "monthly",
            features: [
              "Everything in Premium",
              "Unlimited personal training",
              "Guest passes (5/month)",
              "Exclusive VIP area access",
              "Complimentary towel service",
              "Nutrition meal planning",
              "Priority parking",
              "24/7 access",
              "Sauna & steam room",
            ],
            isPopular: false,
            maxUsers: 100,
            currentUsers: 89,
          },
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchMemberships();
  }, []);

  const getMembershipIcon = (name) => {
    switch (name.toLowerCase()) {
      case "basic":
        return <Users className="w-8 h-8" />;
      case "premium":
        return <Star className="w-8 h-8" />;
      case "vip":
        return <Crown className="w-8 h-8" />;
      default:
        return <Zap className="w-8 h-8" />;
    }
  };

  const getMembershipColor = (name) => {
    switch (name.toLowerCase()) {
      case "basic":
        return "bg-blue-500";
      case "premium":
        return "bg-purple-500";
      case "vip":
        return "bg-yellow-500";
      default:
        return "bg-primary-500";
    }
  };

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
        title="Membership Plans"
        subtitle="  Choose the perfect membership plan that fits your fitness goals and lifestyle."
        backgroundImage="../../assets/images/bg.jpeg"
      />

      {/* Membership Plans */}
      <section className="section bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2>Choose Your Plan</h2>
            <p>
              Flexible membership options designed to meet your fitness needs
              and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {memberships.map((membership, index) => (
              <motion.div
                key={membership._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative card group ${membership.isPopular ? "ring-4 ring-primary-500 scale-105" : ""}`}
              >
                {membership.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`w-20 h-20 ${getMembershipColor(membership.name)} rounded-full flex items-center justify-center mx-auto mb-6 text-white`}
                  >
                    {getMembershipIcon(membership.name)}
                  </div>

                  <h3 className="text-3xl font-bold mb-2 text-gray-800">
                    {membership.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{membership.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-800">
                      ${membership.price}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{membership.duration}
                    </span>
                  </div>

                  {membership.maxUsers && (
                    <div className="mb-4">
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>
                          {membership.currentUsers}/{membership.maxUsers}{" "}
                          members
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{
                            width: `${(membership.currentUsers / membership.maxUsers) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {membership.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    membership.isPopular
                      ? "bg-primary-600 text-white hover:bg-primary-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <span>Choose Plan</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="section bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2>All Memberships Include</h2>
            <p>Essential benefits that come with every membership plan.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Flexible Access",
                description: "Access to gym during operating hours",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community",
                description: "Join our supportive fitness community",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "No Contract",
                description: "Cancel anytime with 30-day notice",
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: "Expert Support",
                description: "Professional trainers and staff support",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-title"
          >
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about our membership plans and policies.</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "Can I upgrade or downgrade my membership?",
                answer:
                  "Yes, you can upgrade or downgrade your membership at any time. Changes take effect at the next billing cycle.",
              },
              {
                question: "Is there a contract or can I cancel anytime?",
                answer:
                  "All our memberships are month-to-month with no long-term contracts. You can cancel with 30 days notice.",
              },
              {
                question: "Do you offer student or senior discounts?",
                answer:
                  "Yes, we offer 10% discounts for students and seniors with valid ID. Contact us for more details.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, debit cards, and bank transfers. Auto-pay is available for convenience.",
              },
              {
                question: "Can I freeze my membership?",
                answer:
                  "Yes, you can freeze your membership for up to 3 months per year for a small fee.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <h4 className="text-xl font-bold mb-3 text-gray-800">
                  {faq.question}
                </h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
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
              Start your fitness journey today with a membership plan that fits
              your goals and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-white text-secondary-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Sign Up Now
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

export default MembershipPage;
