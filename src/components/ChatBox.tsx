
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType, sendChatMessage } from "@/services/chatService";

interface ChatBoxProps {
  messages: ChatMessageType[];
  onSendMessage: (message: string) => Promise<void>;
  apiKey: string | null;
  loading: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ 
  messages, 
  onSendMessage, 
  apiKey,
  loading 
}) => {
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || !apiKey) return;
    
    await onSendMessage(inputValue.trim());
    setInputValue("");
    
    // Focus back on the textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b">
        <h3 className="text-md font-medium">Travel Assistant</h3>
        <p className="text-xs text-muted-foreground">
          Ask follow-up questions about your travel plans
        </p>
      </div>
      
      <ScrollArea 
        ref={scrollAreaRef}
        className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[350px]"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <p className="text-muted-foreground text-sm mb-2">
              No messages yet
            </p>
            <p className="text-muted-foreground text-xs max-w-[250px]">
              Ask a question about your trip, such as hotel recommendations, local attractions, or dining options
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
        
        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs">Thinking...</span>
          </div>
        )}
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-2 border-t flex gap-2">
        <Textarea
          ref={textareaRef}
          className="min-h-10 resize-none"
          placeholder="Ask a question about your trip..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || !apiKey}
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={!inputValue.trim() || loading || !apiKey}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
