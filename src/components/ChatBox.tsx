
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, Undo } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType, sendChatMessage, clearChatHistory } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [suggestions, setSuggestions] = useState<string[]>([
    "What are the best places to visit in my destination?",
    "Suggest some local restaurants to try",
    "What should I pack for this trip?",
    "Tell me about local transportation options"
  ]);

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

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  const handleClearChat = () => {
    clearChatHistory();
    toast({
      title: "Chat history cleared",
      description: "Your conversation has been reset.",
    });
    // We need to tell the parent component to refresh the messages state
    onSendMessage("Hi there! I'd like to learn more about my trip.");
  };

  return (
    <div className="flex flex-col h-full bg-background/50 backdrop-blur-sm rounded-lg">
      <div className="p-3 border-b flex justify-between items-center">
        <div>
          <h3 className="text-md font-medium">Travel Assistant</h3>
          <p className="text-xs text-muted-foreground">
            Ask follow-up questions about your travel plans
          </p>
        </div>
        {messages.length > 1 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearChat}
            className="h-8 px-2"
          >
            <Undo className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Reset</span>
          </Button>
        )}
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
      
      {messages.length === 1 && !loading && (
        <div className="px-4 py-2 border-t">
          <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-2 py-1 rounded-full transition-colors"
                disabled={loading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
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
