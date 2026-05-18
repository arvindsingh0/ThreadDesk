import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AICREDITS_API_KEY,
  baseURL: "https://api.aicredits.in/v1",
});

const generateEmbedding = async (text) => {

  try {

    const response = await client.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;

  } catch (error) {

    console.log("EMBEDDING ERROR:");
    console.log(error);

    throw error;

  }

};

export default generateEmbedding;