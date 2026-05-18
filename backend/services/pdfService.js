import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const extractTextFromPDF = async (filePath) => {

  try {

    const dataBuffer = new Uint8Array(
      fs.readFileSync(filePath)
    );

    const pdf = await pdfjsLib.getDocument({
      data: dataBuffer,
    }).promise;

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {

      const page = await pdf.getPage(i);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map(item => item.str)
        .join(" ");

      extractedText += pageText + "\n";

    }

    return extractedText;

  } catch (error) {

    console.log("PDF EXTRACTION ERROR:");
    console.log(error);

    throw error;

  }

};

export default extractTextFromPDF;