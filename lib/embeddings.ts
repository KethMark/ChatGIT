import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

export function loadEmbeddings(){
    return new OllamaEmbeddings({
        model: "nomic-embed-text"
    });
}