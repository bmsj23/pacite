export default function Tools() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-[var(--color-primary)]">
        Welcome to Pacite [TOOLS]
      </h1>

      <p className="mt-4 text-lg text-gray-700 max-w-lg text-center">
        In Pacite, you can utilize various tools to help you with your writing and citation needs.
        My first tool, the citation generator, is coming soon.
      </p>

    <button className="mt-6 px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
      Get Started
    </button>

    </main>
  )
}
