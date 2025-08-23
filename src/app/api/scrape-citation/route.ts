import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

interface CitationMetadata {
  title?: string;
  authors?: string[];
  publishedDate?: string;
  publisher?: string;
  url: string;
  type: "webpage" | "article" | "book" | "journal";
  doi?: string;
  isbn?: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  accessDate: string;
  description?: string;
}

// Helper function to extract metadata from HTML
function extractMetadata(html: string, url: string): CitationMetadata {
  const $ = cheerio.load(html);
  const metadata: CitationMetadata = {
    url,
    type: "webpage",
    accessDate: new Date().toISOString().split("T")[0],
  };

  // Extract title - try multiple sources in order of preference
  let rawTitle =
    $('meta[name="citation_title"]').attr("content") ||
    $('meta[property="og:title"]').attr("content") ||
    $('meta[name="title"]').attr("content") ||
    $('meta[property="twitter:title"]').attr("content") ||
    $("title").text() ||
    $("h1").first().text() ||
    "";

  if (rawTitle) {
    // clean up title
    rawTitle = rawTitle.trim().replace(/\s+/g, " ");

    // remove common site name patterns from title
    const siteName =
      metadata.publisher ||
      $('meta[property="og:site_name"]').attr("content") ||
      new URL(url).hostname.replace("www.", "");

    if (siteName) {
      // remove patterns like "- WebMD", "| WebMD", "WebMD:", etc.
      const patterns = [
        new RegExp(`\\s*[-|:]\\s*${siteName}\\s*$`, "i"),
        new RegExp(`\\s*\\|\\s*${siteName}\\s*$`, "i"),
        new RegExp(`^${siteName}\\s*[-|:]\\s*`, "i"),
      ];

      for (const pattern of patterns) {
        rawTitle = rawTitle.replace(pattern, "").trim();
      }
    }

    metadata.title = rawTitle;
  }

  // extract authors using multiple methods
  const authors: string[] = [];

  // get site name for filtering
  const siteName =
    $('meta[property="og:site_name"]').attr("content") ||
    new URL(url).hostname.replace("www.", "");

  // helper function to validate author names
  const isValidAuthor = (author: string): boolean => {
    const trimmed = author.trim();
    // filter out URLs, social media handles, and site names
    if (
      trimmed.includes("http") ||
      trimmed.includes("facebook.com") ||
      trimmed.includes("twitter.com") ||
      trimmed.includes("@") ||
      trimmed.toLowerCase() === siteName?.toLowerCase() ||
      trimmed.length < 2
    ) {
      return false;
    }
    return true;
  };

  // citation meta tags (most reliable)
  $('meta[name="citation_author"]').each((_, el) => {
    const author = $(el).attr("content");
    if (author && isValidAuthor(author)) {
      authors.push(author.trim());
    }
  });

  // JSON-LD structured data
  if (authors.length === 0) {
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const jsonData = JSON.parse($(el).html() || "");
        if (jsonData.author) {
          if (Array.isArray(jsonData.author)) {
            jsonData.author.forEach((author: string | { name?: string }) => {
              const name = typeof author === "string" ? author : author.name;
              if (name && isValidAuthor(name)) {
                authors.push(name.trim());
              }
            });
          } else if (
            typeof jsonData.author === "string" &&
            isValidAuthor(jsonData.author)
          ) {
            authors.push(jsonData.author.trim());
          } else if (
            jsonData.author.name &&
            isValidAuthor(jsonData.author.name)
          ) {
            authors.push(jsonData.author.name.trim());
          }
        }
      } catch {
        // ignore JSON parsing errors
      }
    });
  }

  // standard author meta tags
  if (authors.length === 0) {
    $('meta[name="author"]').each((_, el) => {
      const author = $(el).attr("content");

      if (author && isValidAuthor(author)) {
        // split multiple authors if separated by commas or semicolons
        author.split(/[,;]/).forEach((a) => {
          const trimmed = a.trim();
          if (trimmed && isValidAuthor(trimmed)) {
            authors.push(trimmed);
          }
        });
      }
    });
  }

  // article author meta tags
  if (authors.length === 0) {
    $('meta[property="article:author"]').each((_, el) => {
      const author = $(el).attr("content");
      if (author && isValidAuthor(author)) {
        authors.push(author.trim());
      }
    });
  }

  if (authors.length > 0) {
    metadata.authors = [...new Set(authors)]; // remove duplicates
  }

  // extract publication date with better parsing
  let rawDate =
    $('meta[name="citation_publication_date"]').attr("content") ||
    $('meta[property="article:published_time"]').attr("content") ||
    $('meta[name="date"]').attr("content") ||
    $('meta[name="publish-date"]').attr("content") ||
    $("time[datetime]").attr("datetime") ||
    "";

  // try JSON-LD for date if not found
  if (!rawDate) {
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const jsonData = JSON.parse($(el).html() || "");
        if (jsonData.datePublished) {
          rawDate = jsonData.datePublished;
        } else if (jsonData.dateModified) {
          rawDate = jsonData.dateModified;
        }
      } catch {
        // ignore JSON parsing errors
      }
    });
  }

  if (rawDate) {
    // parse and format date properly
    const date = new Date(rawDate);
    if (!isNaN(date.getTime())) {
      metadata.publishedDate = date.toISOString().split("T")[0];
    }
  }

  // extract publisher/site name
  metadata.publisher =
    $('meta[name="citation_publisher"]').attr("content") ||
    $('meta[property="og:site_name"]').attr("content") ||
    $('meta[name="publisher"]').attr("content") ||
    "";

  if (metadata.publisher) {
    metadata.publisher = metadata.publisher.trim();
  }

  // Extract DOI
  metadata.doi =
    $('meta[name="citation_doi"]').attr("content") ||
    $('meta[name="doi"]').attr("content") ||
    "";

  // extract journal information
  metadata.journal =
    $('meta[name="citation_journal_title"]').attr("content") || "";
  metadata.volume = $('meta[name="citation_volume"]').attr("content") || "";
  metadata.issue = $('meta[name="citation_issue"]').attr("content") || "";

  // extract description
  metadata.description =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "";

  // determine content type based on URL and metadata
  if (
    metadata.journal ||
    url.includes("scholar.google") ||
    url.includes("pubmed") ||
    url.includes("researchgate.net")
  ) {
    metadata.type = "article";
  } else if (url.includes("amazon.com") || url.includes("books.google")) {
    metadata.type = "book";
  } else if (metadata.doi) {
    metadata.type = "article";
  }

  return metadata;
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // fetch the webpage
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Connection: "keep-alive",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Failed to fetch webpage: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const html = await response.text();
    const metadata = extractMetadata(html, url);

    return NextResponse.json({ metadata });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Failed to scrape webpage" },
      { status: 500 }
    );
  }
}
