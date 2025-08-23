"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function UserDropdown() {
  const { session, signOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/signin"
          className="px-4 py-2 text-gray-700 hover:text-[var(--color-primary)] font-medium transition-colors duration-200"
        >
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-green-700 font-medium transition-colors duration-200"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-sm font-medium">
          {session?.user?.name?.charAt(0).toUpperCase() ||
            session?.user?.email?.charAt(0).toUpperCase() ||
            "U"}
        </div>
        <span className="hidden md:block text-gray-700 font-medium">
          {session?.user?.name || session?.user?.email}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500">{session?.user?.email}</p>
          </div>

          <div className="py-1">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <User size={16} />
              Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Settings size={16} />
              Settings
            </Link>
          </div>

          <div className="border-t border-gray-100 py-1">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
