

export default function CitationGenerator() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Citation Generator🎉</h1>
      <p className="mt-4 text-lg text-gray-700">
        Generate citations easily with our tool. Just enter your text, and we&#39;ll help you format it correctly for your needs.
      </p>
      <input className="mt-4 p-2 border border-gray-300 rounded-lg w-80 text-black" type="text" placeholder="Enter your text here..." />
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Generate Citation
      </button>
    </main>
  )
}
