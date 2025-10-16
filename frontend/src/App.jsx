import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import contexts
import { AuthProvider } from "./contexts/AuthContext";

// Import pages
import HomePage from "./pages/home_page/HomePage";
import AboutPage from "./pages/aboutus_page/AboutPage";
import ServicesPage from "./pages/services_page/ServicesPage";
import MembershipPage from "./pages/membership_page/MembershipPage";
import SchedulePage from "./pages/schedule_page/SchedulePage";
import ContactPage from "./pages/contactus_page/ContactPage";
import TrainerPage from "./pages/trainer_page/TrainerPage";
import UserDashboard from "./pages/user_dashboard/UserDashboard";
import LoginPage from "./pages/auth_page/login_page/LoginPage";
import SignupPage from "./pages/auth_page/signup_page/SignupPage";
import ProfilePage from "./pages/ProfilePage";

// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/trainers" element={<TrainerPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;
