"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "Tools" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl flex items-center justify-between px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-primary tracking-tight">
          Pacite
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <ul className="flex gap-6">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                  pathname === href
                    ? "bg-green-50 text-primary"
                    : "text-gray-700 hover:bg-green-50 hover:text-primary"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/get-started"
          className="ml-4 px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-green-700 transition-colors duration-200">
          Get Started
        </Link>

      </div>

      {/* Mobile navbar menu button */ }

      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-3 right-0 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                    pathname === href
                      ? "bg-green-50 text-primary"
                      : "text-gray-700 hover:bg-green-50 hover:text-primary"
                  }`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/get-started"
            onClick={() => setIsOpen(false)}
            className="mt-6 block text-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-green-700 transition-colors duration-200">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;