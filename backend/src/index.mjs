// index.mjs
import {
    preprocessPDFs
} from './pdfProcessor.js';
import {
    processPDFChunks
} from './geminiAPI.mjs';
import {
    storeResultsInJSON
} from './resultStorage.js';

(async() => {
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