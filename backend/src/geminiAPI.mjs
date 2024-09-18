// geminiAPI.mjs
import dotenv from 'dotenv';
dotenv.config();

import {
    GoogleGenerativeAI
} from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
});

async function analyzeChunk(chunk) {
    try {
        const analysis = await model.generateText({
            input: chunk
        });
        return analysis.output;
    } catch (error) {
        console.error("Error analyzing chunk:", error);
        return null;
    }
}

async function processPDFChunks(chunks) {
    const analyzedChunks = [];
    for (const chunk of chunks) {
        console.log(`Analyzing chunk...`);
        const analysis = await analyzeChunk(chunk);
        if (analysis) {
            analyzedChunks.push(analysis);
        }
    }
    return analyzedChunks;
}

export {
    processPDFChunks
};