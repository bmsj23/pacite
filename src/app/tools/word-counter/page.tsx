"use client";
import { useState } from "react";

export default function WordCounter() {
  const [text, setText] = useState("");

  // Count words by splitting on spaces and filtering empty strings
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">

      {/* Heading */}
      <h1 className="text-4xl md:text-4xl font-extrabold text-gray-900 text-center">
        Word Counter Tool
      </h1>

      <p className="mt-4 text-md text-gray-700 text-center max-w-2xl">
        This tool will help you count the number of words in your text quickly and efficiently.
      </p>

      {/* Textarea */}
      <textarea
        value={text} onChange={(e) => setText(e.target.value)}
        className="mt-8 w-full max-w-2xl h-40 p-4 border border-gray-300 rounded-lg text-black shadow-sm focus:outline-none focus:shadow-md transition duration-200 resize-none" placeholder="Enter your text here..."/>

      {/* Live word count */}
      <p className="mt-2 text-gray-600">
        Word Count: <span className="font-medium">{wordCount}</span>
      </p>

      {/* Button */}
      <button
        className="mt-6 px-6 py-3 bg-[var(--color-primary)] text-white font-medium rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200" onClick={() => alert(`Total words: ${wordCount}`)}>
        Count Words
      </button>
    </main>
  );
}
