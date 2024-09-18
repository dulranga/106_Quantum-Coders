// pdfProcessor.js
import fs from 'fs';
import pdf from 'pdf-parse';
import path from 'path';

const pdfDir = '../pdfs/';

async function extractTextFromPDF(pdfPath) {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdf(dataBuffer);
    return data.text;
}

function chunkText(text, chunkSize = 2000) {
    const chunks = [];
    const words = text.split(' ');
    for (let i = 0; i < words.length; i += chunkSize) {
        chunks.push(words.slice(i, i + chunkSize).join(' '));
    }
    return chunks;
}

async function preprocessPDFs() {
    const pdfFiles = fs.readdirSync(pdfDir);
    const pdfTexts = [];
    for (const file of pdfFiles) {
        const pdfPath = path.join(pdfDir, file);
        console.log(`Extracting text from ${file}...`);
        const text = await extractTextFromPDF(pdfPath);
        const chunks = chunkText(text);
        pdfTexts.push({
            fileName: file,
            chunks: chunks
        });
    }
    return pdfTexts;
}

export {
    preprocessPDFs,
    extractTextFromPDF,
    chunkText
};