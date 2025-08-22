"use client";

// import Image from "next/image";
import Link from "next/link";
import { BookOpenCheck, FileText, SpellCheck, Repeat } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-b from-white to-green-50 px-6 pt-32">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Simplify Your <span className="text-[var(--color-primary)]">Citations</span> & Writing
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-700">
          Pacite helps you generate accurate citations and manage your writing with ease,
          saving you time and effort.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/get-started"
            className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 ease-in-out">Get Started</Link>

          <Link href="/about"
            className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-medium hover:border-primary hover:bg-gray-100 text-primary transition-all duration-300 ease-in-out">Learn More</Link>
        </div>
      </section>

      <section className="relative flex flex-col py-20 bg-white px-6 min-h-screen items-center justify-center">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What are you working on today?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose from a set of tools designed to make your writing needs done at ease.
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Link href="/tools/citation-generator">
            <div className="flex flex-col h-full group p-6 rounded-2xl shadow-md border bg-green-50 hover:bg-[var(--color-primary)] hover:shadow-lg transition-all cursor-pointer">
              <BookOpenCheck className="w-12 h-12 text-[var(--color-primary)] group-hover:text-white mx-auto transition-colors" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center group-hover:text-white">Citation Generator</h3>
              <div className="flex flex-col flex-grow justify-center text-center">
                <p className="mt-2 text-gray-600 text-sm group-hover:text-white"> Quickly generate accurate references in APA, MLA, and more.</p>
              </div>
            </div>
          </Link>

          <Link href="/tools/word-counter">
            <div className="flex flex-col group p-6 rounded-2xl shadow-md border bg-green-50 hover:bg-[var(--color-primary)] hover:shadow-lg transition-all cursor-pointer h-full">
              <FileText className="w-12 h-12 text-[var(--color-primary)] group-hover:text-white mx-auto transition-colors" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center group-hover:text-white">Word Counter</h3>
              <div className="flex flex-col flex-grow justify-center text-center">
                <p className="mt-2 text-gray-600 text-sm group-hover:text-white">Keep track of word and character counts while writing.</p>
              </div>
            </div>
          </Link>

          <div className="flex flex-col p-6 rounded-2xl shadow-md border bg-gray-100 hover:shadow-lg transition-all opacity-70 h-full text-center justify-center">
            <SpellCheck className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-xl font-semibold text-gray-500 text-center">Grammar Check</h3>
            <div className="flex flex-col flex-grow justify-center text-center">
              <p className="mt-2 text-gray-500 text-sm italic">Coming soon!</p>
            </div>
          </div>

          <div className="flex flex-col p-6 rounded-2xl shadow-md border bg-gray-100 hover:shadow-lg transition-all opacity-70 h-full">
            <Repeat className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-xl font-semibold text-gray-500 text-center">Paraphrasing Tool</h3>
            <div className="flex flex-col flex-grow justify-center text-center">
              <p className="mt-2 text-gray-500 text-sm italic">Coming soon!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
