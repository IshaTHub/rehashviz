import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});  //new instance of openai

export async function generateSummaryFromOpenAI(pdfText: string){  //pdfText is the text that we are recieving from langchain API
 
    try{
        const completion = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [  //passing the prompt to the model
                {
                    role: "system",
                    content: SUMMARY_SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: `Transform this document into an engaging, easy-to-read summary, with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
                },
            ],
            temperature: 0.7,  //for consistent results
            max_tokens: 1500,
        });
        
        return completion.choices[0].message.content;
    } catch (error: any) {
        if(error?.status == 429){  //429 is "Too many requests"
            throw new Error("RATE_LIMIT_EXCEEDED");
        }
        throw error;
    }

   
}

