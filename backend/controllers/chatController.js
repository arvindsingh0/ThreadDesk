import generateEmbedding from "../services/embeddingService.js";
import cosineSimilarity from "../services/similarityService.js";
import Vector from "../models/Vector.js";

export const askQuestion = async (req, res) => {

  try {

    const { question } = req.body;

    // Generate embedding for user question
    const questionEmbedding = await generateEmbedding(question);

    // Fetch all stored vectors
    const storedVectors = await Vector.find();

    // Compare similarity
    const scoredChunks = storedVectors.map((item) => {

      const similarity = cosineSimilarity(
        questionEmbedding,
        item.embedding
      );

      return {
        chunk: item.chunk,
        similarity,
      };

    });

    // Sort highest similarity first
    scoredChunks.sort(
      (a, b) => b.similarity - a.similarity
    );

    // Get top 3 relevant chunks
    const topChunks = scoredChunks.slice(0, 3);

    res.status(200).json({
      success: true,
      topChunks,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Retrieval failed",
    });

  }

};