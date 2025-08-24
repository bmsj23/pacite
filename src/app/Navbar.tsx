"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  BookOpenCheck,
  FileText,
  SpellCheck,
  Repeat,
  ChevronDown,
} from "lucide-react";
import UserDropdown from "@/components/UserDropdown";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tools", label: "Tools" },
    { href: "/about", label: "About" },
  ];

  const toolsData = [
    {
      id: "citation-generator",
      href: "/tools/citation-generator",
      label: "Citation Generator",
      description: "Generate citations in APA, MLA, and more",
      icon: BookOpenCheck,
      available: true,
    },
    {
      id: "word-counter",
      href: "/tools/word-counter",
      label: "Word Counter",
      description: "Count words, characters, and paragraphs",
      icon: FileText,
      available: true,
    },
    {
      id: "grammar-checker",
      href: "#grammar-checker",
      label: "Grammar Checker",
      description: "Check and fix grammar errors",
      icon: SpellCheck,
      available: false,
    },
    {
      id: "paraphrasing-tool",
      href: "#paraphrasing-tool",
      label: "Paraphrasing Tool",
      description: "Rewrite text while maintaining meaning",
      icon: Repeat,
      available: false,
    },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl flex items-center justify-between px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-[var(--color-primary)] tracking-tight">
          Pacite
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <ul className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            if (label === "Tools") {
              return (
                <li key={href} className="relative">
                  <div
                    className="relative"
                    onMouseEnter={() => setIsToolsDropdownOpen(true)}
                    onMouseLeave={() => setIsToolsDropdownOpen(false)}>
                    <Link href={href}
                      className={`flex items-center gap-1 px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                        pathname.startsWith("/tools")
                          ? "bg-green-50 text-[var(--color-primary)]"
                          : "text-gray-700 hover:bg-green-50 hover:text-[var(--color-primary)]"
                      }`}>
                      {label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isToolsDropdownOpen ? "rotate-180" : ""
                        }`}/>
                    </Link>

                    {/* Dropdown Menu with extended hover area */}
                    {isToolsDropdownOpen && (
                      <div className="absolute top-full left-0 pt-2 z-50">
                        <div className="w-80 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                          <div className="px-4 py-2 border-b border-gray-100">
                            <h3 className="text-sm font-semibold text-gray-900">
                              Writing Tools
                            </h3>
                          </div>
                          {toolsData.map((tool) => {
                            const IconComponent = tool.icon;
                            return (
                              <Link
                                key={tool.id}
                                href={tool.available ? tool.href : tool.href}
                                className={`flex items-start gap-3 px-4 py-3 transition-colors duration-200 ${
                                  tool.available
                                    ? "hover:bg-green-50 cursor-pointer"
                                    : "opacity-60 cursor-not-allowed"
                                }`}
                                onClick={(e) => {
                                  if (!tool.available) {
                                    e.preventDefault();
                                  }
                                }}>
                                <div className={`p-2 rounded-lg ${ tool.available
                                      ? "bg-green-100 text-[var(--color-primary)]"
                                      : "bg-gray-100 text-gray-400"
                                  }`}>
                                  <IconComponent size={16} />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h4
                                      className={`text-sm font-medium ${ tool.available
                                          ? "text-gray-900"
                                          : "text-gray-500"
                                      }`}>
                                      {tool.label}
                                    </h4>
                                    {!tool.available && (
                                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                                        Coming Soon
                                      </span>
                                    )}
                                  </div>
                                  <p className={`text-xs mt-1 ${
                                      tool.available
                                        ? "text-gray-600"
                                        : "text-gray-400"
                                    }`}>
                                    {tool.description}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            }

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                    pathname === href
                      ? "bg-green-50 text-[var(--color-primary)]"
                      : "text-gray-700 hover:bg-green-50 hover:text-[var(--color-primary)]"
                  }`}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-4">
          <UserDropdown />
        </div>
      </div>

      {/* Mobile navbar menu button */}

      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-3 right-0 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg p-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map(({ href, label }) => {
              if (label === "Tools") {
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                        pathname.startsWith("/tools")
                          ? "bg-green-50 text-[var(--color-primary)]"
                          : "text-gray-700 hover:bg-green-50 hover:text-[var(--color-primary)]"
                      }`}>
                      {label}
                    </Link>

                    {/* Mobile Tools List */}
                    <div className="mt-2 ml-4 space-y-2">
                      {toolsData.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                          <Link
                            key={tool.id}
                            href={tool.available ? tool.href : tool.href}
                            onClick={(e) => {
                              if (!tool.available) {
                                e.preventDefault();
                              } else {
                                setIsOpen(false);
                              }
                            }}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                              tool.available
                                ? "hover:bg-green-50 cursor-pointer"
                                : "opacity-60 cursor-not-allowed"
                            }`}>
                            <div
                              className={`p-1.5 rounded-md ${
                                tool.available
                                  ? "bg-green-100 text-[var(--color-primary)]"
                                  : "bg-gray-100 text-gray-400"
                              }`}>
                              <IconComponent size={14} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`font-medium ${
                                    tool.available
                                      ? "text-gray-900"
                                      : "text-gray-500"
                                  }`}>
                                  {tool.label}
                                </span>
                                {!tool.available && (
                                  <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                                    Soon
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </li>
                );
              }

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                      pathname === href
                        ? "bg-green-50 text-[var(--color-primary)]"
                        : "text-gray-700 hover:bg-green-50 hover:text-[var(--color-primary)]"
                    }`}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6">
            <UserDropdown isMobile={true} onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
