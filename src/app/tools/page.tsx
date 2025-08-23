import Link from "next/link";
import { BookOpenCheck, FileText, SpellCheck, Repeat } from "lucide-react";

export default function Tools() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 pt-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="pt-10 text-3xl sm:text-4xl font-bold text-[var(--color-primary)]">
          Welcome to Pacite!
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
          In Pacite, you can utilize various tools to help you with your writing
          and citation needs. Below is the list of tools available in Pacite.
        </p>
      </div>

      <div className="mt-8 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto w-full">
        <Link href="/tools/citation-generator">
          <div className="flex flex-col h-full group p-6 rounded-2xl shadow-md border bg-green-50 hover:bg-[var(--color-primary)] hover:shadow-lg transition-all cursor-pointer">
            <BookOpenCheck className="w-12 h-12 text-[var(--color-primary)] group-hover:text-white mx-auto transition-colors" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center group-hover:text-white">
              Citation Generator
            </h3>
            <div className="flex flex-col flex-grow justify-center text-center">
              <p className="mt-2 text-gray-600 text-sm group-hover:text-white">
                Quickly generate accurate references in APA, MLA, and more.
              </p>
            </div>
          </div>
        </Link>

        <Link href="/tools/word-counter">
          <div className="flex flex-col h-full group p-6 rounded-2xl shadow-md border bg-green-50 hover:bg-[var(--color-primary)] hover:shadow-lg transition-all cursor-pointer">
            <FileText className="w-12 h-12 text-[var(--color-primary)] group-hover:text-white mx-auto transition-colors" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 text-center group-hover:text-white">
              Word Counter
            </h3>
            <div className="flex flex-col flex-grow justify-center text-center">
              <p className="mt-2 text-gray-600 text-sm group-hover:text-white">
                Keep track of word and character counts while writing.
              </p>
            </div>
          </div>
        </Link>
        <div className="flex flex-col p-6 rounded-2xl shadow-md border bg-gray-100 hover:shadow-lg transition-all opacity-70 h-full text-center justify-center">
          <SpellCheck className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="mt-4 text-xl font-semibold text-gray-500 text-center">
            Grammar Check
          </h3>
          <div className="flex flex-col flex-grow justify-center text-center">
            <p className="mt-2 text-gray-500 text-sm italic">Coming soon!</p>
          </div>
        </div>

        <div className="flex flex-col p-6 rounded-2xl shadow-md border bg-gray-100 hover:shadow-lg transition-all opacity-70 h-full">
          <Repeat className="w-12 h-12 text-gray-400 mx-auto" />
          <h3 className="mt-4 text-xl font-semibold text-gray-500 text-center">
            Paraphrasing Tool
          </h3>
          <div className="flex flex-col flex-grow justify-center text-center">
            <p className="mt-2 text-gray-500 text-sm italic">Coming soon!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
