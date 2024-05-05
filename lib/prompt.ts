import { PromptTemplate } from "@langchain/core/prompts";

const CONDENSE_QUESTION_TEMPLATE = `Given the following conversation and a follow up question,
 rephrase the follow up question to be a standalone question, in its original language.

<chat_history>
  {chat_history}
</chat_history>

Follow Up Input: {question}
Standalone question:`;
export const condenseQuestionPrompt = PromptTemplate.fromTemplate(
  CONDENSE_QUESTION_TEMPLATE
);

const ANSWER_TEMPLATE = `You are an Git AI Assistant.

Answer the question based only on the following context, chat history and question:
<context>
  {context}
</context>

<chat_history>
  {chat_history}
</chat_history>

Question: {question}
`;
export const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);