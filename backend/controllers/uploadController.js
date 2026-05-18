import extractTextFromPDF from "../services/pdfService.js";
import chunkText from "../services/chunkService.js";
import generateEmbedding from "../services/embeddingService.js";


export const uploadDocument = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });

    }

    const filePath = req.file.path;

    const extractedText = await extractTextFromPDF(filePath);

    console.log(extractedText);

    const chunks = chunkText(extractedText);

    const embedding = await generateEmbedding(chunks[0]);


    return res.status(200).json({
      success: true,
      message: "PDF processed successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });

  }

};