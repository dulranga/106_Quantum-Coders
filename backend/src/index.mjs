// index.mjs
import { preprocessPDFs } from "./pdfProcessor.mjs";
import { processPDFChunks } from "./geminiAPI.mjs";
import { storeResultsInJSON } from "./resultStorage.mjs";

import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    console.log("Starting PDF processing...");
    const pdfsData = await preprocessPDFs();
    const analyzedResults = {};

    for (const pdfData of pdfsData) {
      console.log(`Processing and analyzing ${pdfData.fileName}...`);
      const analyzedChunks = await processPDFChunks(pdfData.chunks);
      analyzedResults[pdfData.fileName] = analyzedChunks;
    }

    storeResultsInJSON(analyzedResults);
    console.log("Process completed!");
  } catch (error) {
    console.error("Error during processing:", error);
  }
})();
