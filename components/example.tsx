// import { NextRequest, NextResponse } from "next/server";
// import { Message, StreamingTextResponse} from "ai";
// import { Document } from "@langchain/core/documents";
// import { RunnableSequence, RunnableLambda, RunnableBranch, RunnableMap } from "@langchain/core/runnables";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import { condenseQuestionPrompt, answerPrompt } from "@/lib/prompt";
// import { searchDocs } from "@/lib/vectore-store";
// import { getPineconeClient } from "@/lib/pinecone-client";
// import { Model } from "@/lib/llm";


// const combineDocsFn = (docs: Document[]) => {
//     const serializedDocs = docs.map((docs) => docs.pageContent);
//     return serializedDocs.join("\n\n");
// }

// const formatMessage = ( chatHistory: Message[]) => {
//     const formatDialogTurns = chatHistory.map((message) => {
//       if(message.role === "user") {
//         return `Human: ${message.content}`;
//       } else if ( message.role === "assistant" ) {
//         return `Assistant: ${message.content}`;
//       } else {
//         return `${message.role}: ${message.content}`;
//       }
//     })
//     return formatDialogTurns.join("\n")
// }

// interface ChainInput {
//     chat_history: string,
//     question: string
// }

// export async function POST(req: NextRequest) {
//     try {
        
//         const body = await req.json();
//         const message = body.message ?? [];
//         const previousMessages = message.slice(0, -1);
//         const currentMessageContent = message[message.length -1]?.content;

//         const pinecone = await getPineconeClient();
//         const vectoreStore = await searchDocs(pinecone);
//         const retriever = vectoreStore.asRetriever();

//         const chatHistoryCheck = RunnableLambda.from(
//             (input: ChainInput) => input.chat_history.length > 0
//         )

//         const chatHistoryQuestionChain = RunnableSequence.from([
//             condenseQuestionPrompt,
//             Model,
//             new StringOutputParser(),
//         ])

//         const noChatHistoryQuestion = RunnableLambda.from(
//             (input: ChainInput) => input.question
//         )

//         const condenseChatBranch = RunnableBranch.from([
//             [chatHistoryCheck, chatHistoryQuestionChain],
//             noChatHistoryQuestion
//         ])

//         const retrievalChain = retriever.pipe(combineDocsFn)

//         const mapQuestionAndContext = RunnableMap.from({
//             question: (input: string) => input,
//             context: retrievalChain
//         })

//         const chain = RunnableSequence.from([
//             condenseChatBranch,
//             mapQuestionAndContext,
//             answerPrompt,
//             Model,
//             new StringOutputParser(),
//         ])

//         const stream = await chain.stream({
//             chat_history: formatMessage(previousMessages),
//             question: currentMessageContent
//         })

//         return new StreamingTextResponse(stream)

//     } catch (e: any) {
//         return NextResponse.json({error: e.message}, {status: e.status ?? 500})
//     }
// }

//Test 2 

import { NextRequest, NextResponse } from "next/server";
import { Message, StreamingTextResponse} from "ai";
import { Document } from "@langchain/core/documents";
import { RunnableSequence, RunnableLambda, RunnableBranch, RunnableMap, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { condenseQuestionPrompt, answerPrompt } from "@/lib/prompt";
import { searchDocs } from "@/lib/vectore-store";
import { getPineconeClient } from "@/lib/pinecone-client";
import { Model } from "@/lib/llm";


const combineDocsFn = (docs: Document[]) => {
    const serializedDocs = docs.map((docs) => docs.pageContent);
    return serializedDocs.join("\n\n");
}

const formatMessage = ( chatHistory: Message[]) => {
    const formatDialogTurns = chatHistory.map((message) => {
      if(message.role === "user") {
        return `Human: ${message.content}`;
      } else if ( message.role === "assistant" ) {
        return `Assistant: ${message.content}`;
      } else {
        return `${message.role}: ${message.content}`;
      }
    })
    return formatDialogTurns.join("\n")
}

interface ChainInput {
    chat_history: string,
    question: string
}

export async function POST(req: NextRequest) {
    try {
        
        const body = await req.json();
        const message = body.message ?? [];
        const previousMessages = message.slice(0, -1);
        const currentMessageContent = message[message.length -1]?.content;

        const pinecone = await getPineconeClient();
        const vectoreStore = await searchDocs(pinecone);
        const retriever = vectoreStore.asRetriever();

        const standAloneQuestionChain = RunnableSequence.from([
            {
                chat_history: (input) => formatMessage(input.chat_history),
                question: (input) => input.question,
            },
            condenseQuestionPrompt,
            Model,
            new StringOutputParser()
        ]);

        const retrievalChain = retriever.pipe(combineDocsFn)

        const answerChain = RunnableSequence.from([
            {
                context: retrievalChain,
                question: new RunnablePassthrough()
            },
            answerPrompt,
            Model
        ])

        const conversationalRetrievalChain = standAloneQuestionChain.pipe(answerChain);

        const stream = await conversationalRetrievalChain.stream({
            question: currentMessageContent,
            chat_history: previousMessages
        })

        console.log("Stream:", stream)
        return new StreamingTextResponse(stream)

    } catch (e: any) {
        return NextResponse.json({error: e.message}, {status: e.status ?? 500})
    }
}