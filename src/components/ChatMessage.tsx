
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage as ChatMessageType } from "@/services/chatService";
import { formatDistanceToNow } from "date-fns";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === "user";
  
  // Split content by line breaks to format paragraphs
  const paragraphs = message.content.split('\n').filter(line => line.trim() !== '');
  
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} my-2`}>
      {!isUser && (
        <Avatar className="h-8 w-8 ring-2 ring-primary/10">
          <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
          <AvatarFallback className="bg-primary text-primary-foreground font-medium">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={`flex flex-col max-w-[80%] ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl p-3 shadow-sm transition-all duration-200 ${
            isUser
              ? "bg-accent text-accent-foreground"
              : "bg-secondary/70 backdrop-blur-sm text-secondary-foreground"
          }`}
        >
          {paragraphs.length > 0 ? (
            <div className="text-sm leading-relaxed space-y-2">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed">{message.content}</p>
          )}
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </span>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 ring-2 ring-accent/10">
          <AvatarFallback className="bg-accent text-accent-foreground font-medium">U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
