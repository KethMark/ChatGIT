import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

//visit ollama to install ollama in the terminal install "ollama run nomic-embed-text" para mo work ag embeddings

export async function embedDocs(
    client: Pinecone,
    //@ts-ignore docs error
    docs: Document<Record<string, any>>[]
) {
    try {
        
        const embeddings = new OllamaEmbeddings({model: "nomic-embed-text"});
        const index = client.Index(process.env.PINECONE_INDEX_NAME!);

        await PineconeStore.fromDocuments(docs, embeddings, {
            pineconeIndex: index,
            textKey: "text"
        });

        console.log("Finished indexing")

    } catch (error) {
        console.log("Unsay cause:", error)
        throw new Error("Their's something wrong")
    }
}

export async function searchDocs(client: Pinecone) {
    try {
        
        const embeddings = new OllamaEmbeddings({model: "nomic-embed-text"});
        const index = client.Index(process.env.PINECONE_INDEX_NAME!);
        
        const vectoreStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
        })

        console.log("Searching for index....")
        return vectoreStore

    } catch (error) {
        throw new Error("Their's something wrong")
    }
}