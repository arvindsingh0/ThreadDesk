import generateEmbedding from "../services/embeddingService.js";
import cosineSimilarity from "../services/similarityService.js";
import generateAnswer from "../services/llmService.js";
import Vector from "../models/Vector.js";

export const askQuestion = async (req, res) => {

  try {

    const { question } = req.body;

    // Generate embedding for user question
    const questionEmbedding = await generateEmbedding(question);

    // Fetch stored vectors
    const storedVectors = await Vector.find({
  uploadedBy: req.user.id,
});

    // Calculate similarity
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

    // Top 3 chunks
    const topChunks = scoredChunks.slice(0, 8);

    // Combine chunks into one context string
    const context = topChunks
      .map((item) => item.chunk)
      .join("\n\n");

    // Generate grounded answer
    const answer = await generateAnswer(
      context,
      question
    );

    res.status(200).json({
      success: true,
      answer,
      topChunks,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Chat failed",
    });

  }

};