import { embedDocs } from "@/lib/vectore-store";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

(async () => {
    try {
        const loader = new PDFLoader("_docs/progit.pdf");
        const docs = await loader.load();

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1500,
            chunkOverlap: 500,
        });

        const chunkedDocs = await textSplitter.splitDocuments(docs);

        await embedDocs(chunkedDocs)

        console.log("Success")
    } catch (error) {
        console.error("Their's something wrong:", error)
    }
})();