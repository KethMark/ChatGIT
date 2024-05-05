import React from "react";
import { Message as MessageProps } from "ai/react";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

export const Message: React.FC<MessageProps> = ({ content, role }) => {
  let isUser = role === "user";

  return (
    <div
      className={cn(
        "mb-4 flex items-start gap-4 p-4 md:p-5 rounded-2xl",
        isUser ? "" : "bg-red-50"
      )}
    >
      <Avatar isUser={isUser} />
      <Markdown className={cn("py-1.5 md:py-1 space-y-4")}>{content}</Markdown>
    </div>
  );
};

const Avatar: React.FC<{ isUser?: boolean; className?: string }> = ({
  isUser = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center size-8 shrink-0 rounded-full",
        className
      )}
    >
      {isUser ? (
        <CircleUserRound height={30} width={30} />
      ) : (
        <Image src="/git.svg" height={30} width={30} alt="Logo" />
      )}
    </div>
  );
};

export { Avatar };
