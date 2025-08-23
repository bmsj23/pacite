declare module "citation-js" {
  export default class Cite {
    constructor(data?: string | object | unknown[]);

    format(
      type: "bibliography" | "citation",
      options?: {
        format?: "text" | "html" | "string";
        style?: string;
        lang?: string;
      }
    ): string;

    get(options?: object): unknown[];
  }
}

// Plugin declarations
declare module "@citation-js/plugin-doi" {
  // Plugin doesn't export anything directly, just registers itself
}

declare module "@citation-js/plugin-isbn" {
  // Plugin doesn't export anything directly, just registers itself
}

declare module "@citation-js/plugin-bibtex" {
  // Plugin doesn't export anything directly, just registers itself
}

declare module "@citation-js/plugin-wikidata" {
  // Plugin doesn't export anything directly, just registers itself
}
