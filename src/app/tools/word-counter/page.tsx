export default function WordCounter() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Word Counter Tool</h1>
      <p className="mt-4 text-lg text-gray-700">
        This tool will help you count the number of words in your text.
      </p>
        <textarea
            className="mt-4 p-2 border border-gray-300 rounded-lg w-80 h-40 text-black"
            placeholder="Enter your text here..."
        />
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Count Words
      </button>
    </main>
  );
}