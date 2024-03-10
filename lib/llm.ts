import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const Model = new ChatGroq({
    modelName: "mixtral-8x7b-32768",
    apiKey: process.env.GROQ_API_KEY,
    streaming: true,
    temperature: 0,
    verbose: true
})

export const streamingModel = new ChatGoogleGenerativeAI({
    streaming: true,
    modelName: "gemini-pro",
    temperature: 0,
    verbose: true
})