import { Pinecone } from "@pinecone-database/pinecone";

export async function initPineconeClient() {
    try {
        const pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!
        })

        return pinecone;
    } catch (error) {
        console.error("error", error);
        throw new Error("Failed to initialize Pinecone Client");
    }
}