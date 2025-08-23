"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  // Count words by splitting on spaces and filtering empty strings
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 pt-20">
      <div className="w-full max-w-2xl text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Word Counter Tool
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-700 max-w-xl mx-auto">
          This tool will help you count the number of words in your text quickly
          and efficiently.
        </p>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mt-6 sm:mt-8 w-full h-32 sm:h-40 p-3 sm:p-4 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:shadow-md transition duration-200 resize-none placeholder:text-gray-500"
          placeholder="Enter your text here..."
        />

        {/* Live word count */}
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Word Count: <span className="font-medium">{wordCount}</span>
        </p>

        {/* Button */}
        <button
          className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
          onClick={() => alert(`Total words: ${wordCount}`)}
        >
          Count Words
        </button>
      </div>
    </main>
  );
}
