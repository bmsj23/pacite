"use client";
import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";

// import citation-js components
let Cite: typeof import("citation-js").default | null = null;

export default function CitationGenerator() {
  const [format, setFormat] = useState("APA");
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [citation, setCitation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [citationLoaded, setCitationLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const options = ["APA", "MLA", "Chicago", "Harvard"];

  // Initialize citation-js on client side
  useEffect(() => {
    const initializeCitation = async () => {
      try {
        // dynamic import to ensure client-side loading
        const CitationJS = (await import("citation-js")).default;

        // import required plugins
        await import("@citation-js/plugin-doi");
        await import("@citation-js/plugin-isbn");
        await import("@citation-js/plugin-bibtex");
        await import("@citation-js/plugin-wikidata");

        Cite = CitationJS;
        setCitationLoaded(true);
        console.log("Citation-js loaded successfully");
      } catch (error) {
        console.error("Failed to load citation-js:", error);
        setCitation(
          "Failed to load citation library. Please refresh the page."
        );
      }
    };

    initializeCitation();
  }, []);

  // helper function to extract DOI from various URL formats
  const extractDOI = (input: string): string | null => {
    // Common DOI patterns
    const doiPatterns = [
      /(?:doi:|DOI:)\s*(10\.\d+\/[^\s]+)/i,
      /(?:dx\.)?doi\.org\/(10\.\d+\/[^\s]+)/i,
      /(?:www\.)?doi\.org\/(10\.\d+\/[^\s]+)/i,
      /(10\.\d+\/[^\s]+)/i,
    ];

    for (const pattern of doiPatterns) {
      const match = input.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  // helper function to detect input type
  const detectInputType = (
    input: string
  ): { type: string; processedInput: string } => {
    const trimmedInput = input.trim();

    // check for DOI
    const extractedDOI = extractDOI(trimmedInput);
    if (extractedDOI) {
      return { type: "DOI", processedInput: extractedDOI };
    }

    // check for ISBN (10 or 13 digits, with or without hyphens)
    const isbnPattern =
      /^(?:ISBN[-\s]?)?(?:\d{1,5}[-\s]?\d{1,7}[-\s]?\d{1,7}[-\s]?[\dX]|\d{13})$/i;
    if (isbnPattern.test(trimmedInput.replace(/[-\s]/g, ""))) {
      return {
        type: "ISBN",
        processedInput: trimmedInput
          .replace(/ISBN[-\s]?/i, "")
          .replace(/[-\s]/g, ""),
      };
    }

    // check for URL patterns that might contain identifiers
    if (trimmedInput.startsWith("http")) {
      // try to extract DOI from URL
      const doiFromUrl = extractDOI(trimmedInput);
      if (doiFromUrl) {
        return { type: "DOI", processedInput: doiFromUrl };
      }
      return { type: "URL", processedInput: trimmedInput };
    }

    // default to treating as raw text/citation data
    return { type: "TEXT", processedInput: trimmedInput };
  };

  const handleCite = async () => {
    if (!input.trim()) return;
    if (!citationLoaded || !Cite) {
      setCitation(
        "Citation library is still loading. Please try again in a moment."
      );
      return;
    }

    setIsLoading(true);
    setCitation("");

    try {
      const { type, processedInput } = detectInputType(input);
      console.log(`Detected input type: ${type}, processed: ${processedInput}`);

      let cite;

      if (type === "URL" && !processedInput.includes("doi.org")) {
        // scrape metadata from URL
        try {
          const response = await fetch("/api/scrape-citation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: processedInput }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const { metadata } = await response.json();
          console.log("Scraped metadata:", metadata);

          // create citation object from scraped metadata
          const citationData = {
            type: metadata.type || "webpage",
            title: metadata.title || "Untitled",
            URL: metadata.url,
            accessed: metadata.accessDate,
            ...(metadata.authors &&
              metadata.authors.length > 0 && {
                author: metadata.authors.map((name: string) => {
                  const parts = name.trim().split(" ");
                  if (parts.length === 1) {
                    return { literal: name.trim() };
                  }
                  return {
                    family: parts[parts.length - 1],
                    given: parts.slice(0, -1).join(" "),
                  };
                }),
              }),
            ...(metadata.publishedDate && {
              issued: {
                "date-parts": [
                  [
                    new Date(metadata.publishedDate).getFullYear(),
                    new Date(metadata.publishedDate).getMonth() + 1,
                    new Date(metadata.publishedDate).getDate(),
                  ],
                ],
              },
            }),
            ...(metadata.publisher && { publisher: metadata.publisher }),
            ...(metadata.journal && { "container-title": metadata.journal }),
            ...(metadata.volume && { volume: metadata.volume }),
            ...(metadata.issue && { issue: metadata.issue }),
            ...(metadata.doi && { DOI: metadata.doi }),
          };

          cite = new Cite(citationData);
        } catch (scrapeError) {
          console.error("Scraping failed:", scrapeError);
          // fallback to basic web citation
          const basicCitation = {
            type: "webpage",
            title: "Web Page",
            URL: processedInput,
            accessed: new Date().toISOString().split("T")[0],
          };
          cite = new Cite(basicCitation);
        }
      } else {
        // for DOIs, ISBNs, and other supported formats
        cite = new Cite(processedInput);
      }

      // map UI format to citation-js style
      let style = "apa"; // default
      if (format === "MLA") style = "modern-language-association";
      if (format === "Chicago") style = "chicago-author-date";
      if (format === "Harvard") style = "harvard-cite-them-right";

      // generate the formatted citation
      const output = cite.format("bibliography", {
        format: "text",
        style: style,
      });

      setCitation(output);
    } catch (error) {
      console.error("Citation error:", error);

      // provide more specific error messages
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      if (errorMessage.includes("This format is not supported")) {
        setCitation(
          "This input format is not supported. Please try:\n" +
            "• A DOI (e.g., 10.1038/nature12373)\n" +
            "• An ISBN (e.g., 9780262033848)\n" +
            "• A direct DOI URL (e.g., https://doi.org/10.1038/nature12373)"
        );
      } else if (
        errorMessage.includes("Server responded with status code 404")
      ) {
        setCitation(
          "Could not find publication data. Please check:\n" +
            "• The DOI or ISBN is correct\n" +
            "• The publication exists in online databases\n" +
            "• Try a different identifier if available"
        );
      } else {
        setCitation(
          "Could not generate citation. Please try:\n" +
            "• A valid DOI (e.g., 10.1038/nature12373)\n" +
            "• An ISBN (e.g., 9780262033848)\n" +
            "• A direct DOI URL"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 justify-center items-center px-4 sm:px-6 pt-20">
      <div className="w-full max-w-2xl text-center">
        {/* Top section: Heading & Description */}
        <div className="mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Citation Generator
          </h1>
          <p className="mt-4 text-md text-gray-700">
            Generate citations easily with Pacite. Enter any URL, DOI, or ISBN
            and Pacite will automatically extract metadata and format it
            correctly.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Supported inputs:</strong>
            <br />• Any webpage URL (ResearchGate, news articles, blogs, etc.)
            <br />• DOI:{" "}
            <code className="bg-gray-200 px-1 rounded">
              10.1038/nature12373
            </code>
            <br />• ISBN:{" "}
            <code className="bg-gray-200 px-1 rounded">9780262033848</code>
            <br />• DOI URL:{" "}
            <code className="bg-gray-200 px-1 rounded">
              https://doi.org/10.1038/nature12373
            </code>
          </p>
        </div>

        {/* Input container */}
        <div className="relative w-full flex flex-col sm:flex-row items-stretch sm:items-center focus:shadow-md gap-2 sm:gap-0">
          {/* Dropdown on the left */}
          <div className="relative z-10 w-full sm:w-auto">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center justify-between px-4 h-12 w-full sm:w-32 bg-gray-100 border border-gray-300 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-gray-700 text-sm focus:outline-none hover:overflow-hidden focus:ring-0 transition box-border"
            >
              {format} <span className="ml-1">&#9662;</span>
            </button>

            {open && (
              <ul className="absolute top-full left-0 mt-0 w-full sm:w-32 rounded-lg bg-gray-100 border border-gray-300 shadow-lg z-50">
                {options.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setFormat(option);
                      setOpen(false);
                    }}
                    className="px-3 py-2 cursor-pointer text-gray-700 hover:rounded-md hover:bg-[var(--color-primary)] hover:text-white transition"
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
            placeholder="Enter any URL, DOI, or ISBN..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 h-12 p-4 border border-gray-300 sm:border-l-0 sm:border-r-0 text-black focus:outline-none focus:ring-0 focus:shadow-md transition box-border rounded-lg sm:rounded-none"
          />

          {/* Cite button on the right */}
          <button
            onClick={handleCite}
            disabled={isLoading || !citationLoaded}
            className="px-6 py-2 h-12 bg-[var(--color-primary)] text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            {isLoading ? "Citing..." : "Cite"}
          </button>
        </div>

        {/* Citation output */}
        {citation && (
          <div className="mt-8 p-4 bg-white shadow rounded-lg text-left">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
              <h2 className="text-lg font-semibold">Generated Citation:</h2>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(citation);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error("Failed to copy:", err);
                    // fallback for older browsers

                    const textArea = document.createElement("textarea");

                    textArea.value = citation;
                    document.body.appendChild(textArea);

                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);

                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
                className={`flex items-center gap-1 px-2 sm:px-1 py-1 text-white text-xs rounded transition-colors duration-200 w-full sm:w-16 justify-center ${
                  copied
                    ? "bg-gray-400 hover:bg-gray-700"
                    : "bg-gray-400 hover:bg-gray-700"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 p-3 rounded border overflow-x-auto">
              <p className="text-gray-800 whitespace-pre-wrap break-words">
                {citation}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
