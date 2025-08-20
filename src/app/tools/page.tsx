

export default function Tools() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Pacite 🎉</h1>
      <p className="mt-4 text-lg text-gray-700">
        Here are some tools to help you with your writing and citation needs.
      </p>
      <p className="mt-4 text-lg text-gray-700">
        You can use the citation generator to create citations for your research
        papers.
      </p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Citation Generator
      </button>
        <p className="mt-4 text-lg text-gray-700">
            You can also use the word counter to count the number of words in your text.
        </p>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Word Counter
        </button>
    </main>
  )
}
