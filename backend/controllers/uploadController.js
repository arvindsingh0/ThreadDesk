import extractTextFromPDF from "../services/pdfService.js";
import chunkText from "../services/chunkService.js";

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

    console.log(chunks);   
    
    return res.status(200).json({
      success: true,
      message: "PDF uploaded and text extracted successfully",
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });

  }

};