"use client";

import { Message as MessageProps, useChat } from "ai/react";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import LoadingDots from "./ui/loadingdots";
import { Input } from "./ui/input";
import { useEffect, useRef } from "react";
import { INITIAL_QUESTION } from "@/lib/const";
import { About } from "./about";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Message } from "./message"

export default function Chatbox() {

  const formRef = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setInput } =
    useChat({
      api: "/api/web",
  })

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  const onClickQuestion = (value: string) => {
    setInput(value);
    setTimeout(() => {
      formRef.current?.dispatchEvent(
        new Event("submit", {
          cancelable: true,
          bubbles: true,
        }),
      )
    },1)
  }

  return (
    <main className="relative max-w-screen-md p-4 md:p-6 mx-auto flex min-h-svh !pb-32 md:!pb-40 overflow-y-auto">
      <div className="w-full">
        
        {messages.map((message: MessageProps) => {
          return <Message key={message.id} {...message} />
        })}

        {messages.length === 0 && (
          <div>
            <div className="flex flex-col items-center justify-center space-y-5 mt-28">
              <Image
                src='/git.svg'
                height={60}
                width={60}
                alt="Logo"
              />
              <h1 className="text-3xl font-semibold">How can I help you today?</h1>
            </div>
            <div className="md:absolute inset-x-0 bottom-36 mx-auto grid md:grid-cols-2 gap-2 md:gap-4">
              {INITIAL_QUESTION.map((message) => {
                return (
                  <button
                    key={message.content}
                    type="button"
                    className="cursor-pointer select-none text-left bg-white font-normal
                    border border-gray-200 rounded-xl p-3 md:px-4 md:py-3
                    hover:bg-zinc-50 hover:border-zinc-400"
                    onClick={() => onClickQuestion(message.content)}
                  >
                    {message.content}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={cn("absolute inset-x-0 bottom-0 bg-white",'fixed bottom-0 w-full mx-auto max-w-3xl')}>
        <span
          className="absolute bottom-full h-20 inset-x-0 from-white/0
          bg-gradient-to-b to-white pointer-events-none"
        />
        <form
          onSubmit={handleSubmit}
          className="relative"
          ref={formRef}
        >
          <Input
            disabled={isLoading}
            value={input}
            onChange={handleInputChange}
            autoFocus={false}
            className=" pr-12 max-w-3xl"
            placeholder={
              isLoading ? "Waiting for response..." : "Ask me anything..."
            }
          />
          <Button
            className="absolute right-1 top-2"
            variant="ghost"
            type="submit"
          >
            {isLoading ? <LoadingDots color='#000' style="small"/> : <SendHorizontal className="w-4 h-4"/>}
          </Button>
        </form>
        <About/>
      </div>
    </main>
  );
}
