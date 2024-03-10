import { Pinecone } from "@pinecone-database/pinecone";
import { delay } from "./utils";

let pineconeClientInstance: Pinecone | null = null;

async function createIndex(client: Pinecone, indexName: string) {
    try {
        await client.createIndex({
            name: indexName,
            dimension: 768,
            metric: "cosine",
            spec: {
                pod: {
                  environment: 'gcp-starter',
                  podType: "starter",
                }
            }
        })

        console.log("Waiting for seconds for index initialization to complete...");
        await delay(5);
        console.log("Index created !!");

    } catch (error) {
        console.error("Error:", error)
        throw new Error("Index creation failed");
    }
}

async function initPineconeClient() {
    try {
        const pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!
        })
        const indexName = process.env.PINECONE_INDEX_NAME!;

        const existingIndexes = await pinecone.listIndexes();

        if(!existingIndexes){
            createIndex(pinecone, indexName)
        } else {
            console.log("Your index already exist")
        }
        return pinecone;
    } catch (error) {
        console.error("error", error);
        throw new Error("Failed to initialize Pinecone Client");
    }
}

export async function getPineconeClient(){
    if(!pineconeClientInstance) {
        pineconeClientInstance = await  initPineconeClient();
    }

    return pineconeClientInstance
}