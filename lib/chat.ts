import { ChatGroq } from "@langchain/groq";

export function loadChat(){
    return new ChatGroq({
        modelName: "mixtral-8x7b-32768",
        apiKey: process.env.GROQ_API_KEY,
        temperature: 0,
        verbose: true,
        maxRetries: 5
    });
}