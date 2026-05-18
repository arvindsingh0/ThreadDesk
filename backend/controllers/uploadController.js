import extractTextFromPDF from "../services/pdfService.js";
import chunkText from "../services/chunkService.js";
import generateEmbedding from "../services/embeddingService.js";
import Vector from "../models/Vector.js";

export const uploadDocument = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });

    }

    const filePath = req.file.path;

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(filePath);

    // Split text into chunks
    const chunks = chunkText(extractedText);

    // Generate embeddings and store in MongoDB
    for (const chunk of chunks) {

      const embedding = await generateEmbedding(chunk);

      await Vector.create({
        chunk,
        embedding,
        documentName: req.file.originalname,
        uploadedBy: req.user.id,
      });

    }

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