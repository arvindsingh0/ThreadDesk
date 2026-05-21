import extractTextFromPDF from "../services/pdfService.js";
import chunkText from "../services/chunkService.js";
import generateEmbedding from "../services/embeddingService.js";
import Vector from "../models/Vector.js";

export const uploadDocument = async (req, res) => {

  try {

    const tenantKey = req.body.tenantKey?.trim();

    if (!tenantKey) {

      return res.status(400).json({
        success: false,
        message: "Tenant key is required",
      });

    }

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });

    }

    const data = new Uint8Array(req.file.buffer);

    // Extract text from PDF
    const extractedText = await extractTextFromPDF(data);

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
        tenantKey,
      });

    }

    return res.status(200).json({
      success: true,
      message: `PDF processed successfully for tenant ${tenantKey}`,
      tenantKey,
      chunksStored: chunks.length,
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });

  }

};
