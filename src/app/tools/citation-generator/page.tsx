"use client";
import { useState } from "react";

export default function CitationGenerator() {
  const [format, setFormat] = useState("APA");
  const [open, setOpen] = useState(false);
  const options = ["APA", "MLA", "Chicago", "Harvard"];

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 justify-center items-center px-6">
      <div className="w-full max-w-2xl text-center">
        {/* Top section: Heading & Description */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Citation Generator
          </h1>
          <p className="mt-4 text-md text-gray-700">
            Generate citations easily with Pacite. Just enter your text, and Pacite will format it correctly for your needs.
          </p>
        </div>

        {/* Input container */}
        <div className="relative w-full flex items-center focus:shadow-md">
          {/* Dropdown on the left */}
          <div className="relative z-10">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between px-4 h-12 w-32 bg-gray-100 border border-r border-gray-300 rounded-l-lg text-gray-700 text-sm focus:outline-none focus:ring-0 transition box-border"
            >
              {format} <span className="ml-1">&#9662;</span>
            </button>

            {open && (
              <ul className="absolute top-full left-0 mt-0 w-32 rounded-lg bg-gray-100 border border-gray-300 rounded-b-lg shadow-lg z-50">
                {options.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setFormat(option);
                      setOpen(false);
                    }}
                    className="px-3 py-2 cursor-pointer text-gray-700 hover:bg-[var(--color-primary)] hover:text-white transition"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Text input */}
          <input
            type="text"
            placeholder="Enter your text here..."
            className="flex-1 h-12 p-4 border border-gray-300 border-l-0 border-r-0 text-black focus:outline-none focus:ring-0 focus:shadow-md transition box-border"
          />

          {/* Cite button on the right */}
          <button
            className="px-6 py-2 h-12 bg-[var(--color-primary)] text-white rounded-r-lg hover:bg-green-700 transition-colors duration-200"
          >
            Cite
          </button>
        </div>
      </div>
    </main>
  );
}
