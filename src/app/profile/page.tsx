"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, Calendar, Edit2, Save, X } from "lucide-react";

export default function Profile() {
  const { session } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [email, setEmail] = useState(session?.user?.email || "");

  const handleSave = () => {
    // TODO: Implement profile update functionality
    console.log("Saving profile:", { name, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(session?.user?.name || "");
    setEmail(session?.user?.email || "");
    setIsEditing(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 px-4 pb-4 sm:px-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your profile.
          </p>
          <a
            href="/signin"
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 pb-4 sm:px-6">
      <div className="w-[90%] max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
                    {session.user?.name?.charAt(0).toUpperCase() ||
                      session.user?.email?.charAt(0).toUpperCase() ||
                      "U"}
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                      {session.user?.name || "User Profile"}
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      Manage your account information
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base w-full sm:w-auto sm:self-start"
              >
                <Edit2 size={16} />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Profile Information
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="text-gray-400" size={16} />
                    <span className="text-gray-900">
                      {session.user?.name || "Not provided"}
                    </span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="text-gray-400" size={16} />
                    <span className="text-gray-900">{session.user?.email}</span>
                  </div>
                )}
              </div>

              {/* Account Created */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Since
                </label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="text-gray-400" size={16} />
                  <span className="text-gray-900">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  <Save size={16} />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Account Statistics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4 sm:mt-6">
          <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Account Activity
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-[var(--color-primary)]">
                  0
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Citations Generated
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-gray-600 mt-1">Words Counted</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-gray-600 mt-1">Tools Used</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
