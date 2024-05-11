import { Pinecone } from "@pinecone-database/pinecone";

export function loadPinecone(){
    return new Pinecone({
        apiKey: process.env.PINECONE_API_KEY ?? '',
    });
}