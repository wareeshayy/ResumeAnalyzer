import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// Set up the worker for pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const extractTextFromFile = async (file) => {
  if (file.type.startsWith('image/')) {
    // OCR for images
    return await extractTextFromImage(file);
  } else if (file.type === 'application/pdf') {
    // Text extraction for PDFs
    return await extractTextFromPDF(file);
  }
  throw new Error('Unsupported file type');
};

const extractTextFromImage = async (file) => {
  // Use Tesseract.js for OCR
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const worker = await Tesseract.createWorker('eng');
        const ret = await worker.recognize(reader.result);
        await worker.terminate();
        resolve(ret.data.text);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const extractTextFromPDF = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async function() {
      try {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + '\n\n';
        }
        resolve(fullText);
      } catch (err) {
        console.error("PDF extraction error", err);
        // Fallback to OCR if PDF is purely images? 
        // For simplicity, just return what we have (might be empty)
        resolve("");
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
