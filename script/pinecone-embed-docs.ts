import { embedDocs } from "@/lib/vectore-store"
import { getPineconeClient } from "@/lib/pinecone-client"
import { chunksLoader } from "@/lib/pdfloader";

(async () => {
    try {
        const pinecones = await getPineconeClient();
        console.log("preparing chunks from pdf file");
        const docs = await chunksLoader();
        console.log(`Loading ${docs.length} chunks into pinecone...`);
        await embedDocs(pinecones, docs);
        console.log("Data embedded and stored in pinecone index")
    } catch (error) {
        console.error("Init client script failed", error)
    }
})();