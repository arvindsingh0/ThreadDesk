import generateEmbedding from "../services/embeddingService.js";
import cosineSimilarity from "../services/similarityService.js";
import generateAnswer from "../services/llmService.js";
import Vector from "../models/Vector.js";

const answerQuestionFromVectors = async ({
  question,
  vectorFilter,
}) => {
  const questionEmbedding = await generateEmbedding(question);

  const storedVectors = await Vector.find(vectorFilter);

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

  scoredChunks.sort(
    (a, b) => b.similarity - a.similarity
  );

  const topChunks = scoredChunks.slice(0, 8);

  const context = topChunks
    .map((item) => item.chunk)
    .join("\n\n");

  const answer = await generateAnswer(
    context,
    question
  );

  return {
    answer,
    topChunks,
  };
};

export const askQuestion = async (req, res) => {

  try {

    const { question, tenantKey } = req.body;

    if (!question?.trim()) {

      return res.status(400).json({
        success: false,
        message: "Question is required",
      });

    }

    const result = await answerQuestionFromVectors({
      question,
      vectorFilter: tenantKey?.trim()
        ? {
          tenantKey: tenantKey.trim(),
        }
        : {
          uploadedBy: req.user.id,
        },
    });

    res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Chat failed",
    });

  }

};

export const askPublicQuestion = async (req, res) => {

  try {

    const { question, tenantKey } = req.body;

    if (!question?.trim()) {

      return res.status(400).json({
        success: false,
        message: "Question is required",
      });

    }

    if (!tenantKey?.trim()) {

      return res.status(400).json({
        success: false,
        message: "Tenant key is required",
      });

    }

    const result = await answerQuestionFromVectors({
      question,
      vectorFilter: {
        tenantKey: tenantKey.trim(),
      },
    });

    res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Chat failed",
    });

  }

};
