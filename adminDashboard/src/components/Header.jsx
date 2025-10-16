import React, { useState } from "react";
import { Menu, Bell, User, LogOut, Settings } from "lucide-react";

const Header = ({ user, onLogout, onMenuClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-800 h-16 flex items-center justify-between px-6">
      {/* Left side */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-300 hover:bg-gray-800"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden lg:block">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-gray-300 hover:bg-gray-800">
          <Bell className="w-6 h-6" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center space-x-3 p-2 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-400">{user?.role || "admin"}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
              <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-400 hover:bg-red-900"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </header>
  );
};

export default Header;
