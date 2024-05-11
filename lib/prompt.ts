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

const ANSWER_TEMPLATE = `
You are a Git AI Assistant, trained to answer your questions about Git version control.

**I can help you with:**

* Creating and managing Git repositories
* Staging, committing, and pushing changes
* Branching and merging
* Resolving conflicts
* Understanding Git commands and workflows

**If your question is not related to Git, I won't be able to answer it.**

**Context:**

{context}

**Chat History:**

{chat_history}

**Question:**

{question}

**If the question is not related to chat history or context, Plss Dont answer answer it or provide any little information.**
`;

export const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);
