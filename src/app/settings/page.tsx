"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Trash2,
  AlertTriangle,
  LogOut,
} from "lucide-react";

export default function Settings() {
  const { session, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    // TODO: Implement account deletion
    console.log("Deleting account...");
    setShowDeleteConfirm(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 pb-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to access settings.
          </p>
          <a
            href="/signin"
            className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 sm:px-6 pb-4">
      <div className="w-[90%] max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--color-primary)] rounded-lg flex items-center justify-center text-white">
                <SettingsIcon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Settings
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Manage your account preferences
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Notifications Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Bell className="text-[var(--color-primary)]" size={18} />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Notifications
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      Push Notifications
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Receive notifications about your account activity
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      Email Updates
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Receive email updates about new features
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailUpdates}
                      onChange={(e) => setEmailUpdates(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-primary)]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <Palette className="text-[var(--color-primary)]" size={18} />
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Appearance
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="text-[var(--color-primary)]" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Language & Region
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-[var(--color-primary)]" size={20} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Privacy & Security
                </h2>
              </div>

              <div className="space-y-4">
                <button className="flex items-center gap-3 w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download size={16} className="text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Download Your Data
                    </h3>
                    <p className="text-sm text-gray-500">
                      Export all your account data
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-3 w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={16} className="text-gray-400" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Sign Out
                    </h3>
                    <p className="text-sm text-gray-500">
                      Sign out of your account
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg shadow-sm border border-red-200">
            <div className="px-6 py-6 sm:px-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-500" size={20} />
                <h2 className="text-xl font-semibold text-red-600">
                  Danger Zone
                </h2>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center gap-3 w-full p-3 text-left border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} className="text-red-500" />
                  <div>
                    <h3 className="text-sm font-medium text-red-600">
                      Delete Account
                    </h3>
                    <p className="text-sm text-red-400">
                      Permanently delete your account and all data
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-500" size={24} />
                <h3 className="text-lg font-semibold text-gray-900">
                  Delete Account
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone and all your data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
