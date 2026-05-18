import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.AICREDITS_API_KEY,
  baseURL: "https://api.aicredits.in/v1",
});

const generateAnswer = async (context, question) => {

  try {

    const prompt = `
You are an AI support assistant.

Answer the user's question ONLY using the provided context.

If the answer is not present in the context, say:
"I could not find that information in the uploaded documents."

Context:
${context}

Question:
${question}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,//controls randomness - lower is more focused
    });

    return response.choices[0].message.content;

  } catch (error) {

    console.log("LLM ERROR:");
    console.log(error);

    throw error;

  }

};

export default generateAnswer;