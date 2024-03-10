import { PromptTemplate } from "@langchain/core/prompts";

const EmbedQuestion = `Given the following chat_history and a follow up question, 
if the follow up question references previous parts of the chat rephrase the follow up question to be a standalone question
if not use the follow up question as the standalone question.

<chat_history>
    {chat_history}
</chat_history>

Follow Up Input: {question}
Standalone question:`;

export const condenseQuestionPrompt = PromptTemplate.fromTemplate(EmbedQuestion)

const RetrieveQuestion = `You are an Ai Assistant. Use the following pieces of context to answer the question in the end.
If you don't know the answer, Just say Thank you for wonderfull question but for now i can't process. DO NOT try to make an answer.
If the question is not related to the context, politely respond that you are tuned to only answer question that are related to the context.

<context>
    {context}
</context>

Question: {question}`;

export const answerPrompt = PromptTemplate.fromTemplate(RetrieveQuestion)