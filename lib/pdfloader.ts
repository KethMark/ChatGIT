import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function chunksLoader () {

    try {
        
        const loader = new PDFLoader("_docs/Bohol-Island-State-University-Executive-Summary-2015.pdf")
        const docs = await loader.load();
        console.log(docs[0].pageContent.length)

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 7500,
            chunkOverlap: 100
        });

        const chunkedDocs = await textSplitter.splitDocuments(docs);
        console.log("chunkes:", chunkedDocs)

        return chunkedDocs

    } catch (error) {
        console.log(error)
        throw new Error("PDF Docs chunked Failed")
    }

}