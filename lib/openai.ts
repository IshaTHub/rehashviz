import OpenAI from "openai";
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});  //new instance of openai

const completion = await client.chat.completions.create({
    model: "gpt-4",
    messages: [  //passing the prompt to the model
        {
            role: "system",
            content:"You are a helpful assistant that can answer questions and help with tasks.",
        },
        {
            role: "user",
            content: "Write a one-sentence bedtime story about a unicorn.",
        },
    ],
    temperature: 0.7,  //for consistent results
    max_tokens: 1500,
});

console.log(completion.choices[0].message.content);