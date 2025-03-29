import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-002",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    const prompt = {
      contents: [
        {
          role: "user",
          parts: [
            { text: SUMMARY_SYSTEM_PROMPT },
            {
              text: `IMPORTANT: Follow these formatting rules strictly:
              1. Every point MUST start with a bullet point followed by an emoji and a space
              2. Use the exact format from the system prompt
              3. Include all sections with their respective emojis
              4. Never use numbered lists
              5. Never deviate from the format
              Transform this document into an engaging, easy-to-read summary:\n\n${pdfText}`,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = result.response;

    if (!response) {
      throw new Error("No response from Gemini");
    }

    return response.text();
  } catch (error: any) {
    console.error("Gemini API failed", error);
    throw error;
  }
};
