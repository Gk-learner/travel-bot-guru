import { toast } from "@/components/ui/use-toast";
import { SERP_API_KEY } from "@/lib/constants";

export type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

// Store chat history for context
let chatHistory: ChatMessage[] = [];

export const sendChatMessage = async (message: string, apiKey: string): Promise<ChatMessage> => {
  try {
    // Add user message to history
    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      content: message,
      role: "user",
      timestamp: new Date(),
    };
    chatHistory.push(userMessage);
    
    // Format the conversation history for the Gemini API
    const formattedMessages = chatHistory.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));
    
    // First, get additional context using SERP API if available
    let additionalContext = "";
    if (SERP_API_KEY) {
      try {
        const serpResponse = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(`travel ${message}`)}&api_key=${SERP_API_KEY}`);
        
        if (serpResponse.ok) {
          const serpData = await serpResponse.json();
          if (serpData.organic_results && serpData.organic_results.length > 0) {
            additionalContext = "Here's some relevant information that might help you answer:\n";
            
            // Add top 2 search results as context
            for (let i = 0; i < Math.min(2, serpData.organic_results.length); i++) {
              const result = serpData.organic_results[i];
              additionalContext += `- ${result.title}: ${result.snippet}\n`;
            }
          }
        }
      } catch (error) {
        console.log("SERP API error (non-critical):", error);
        // Continue without SERP data if there's an error
      }
    }
    
    // Add system instructions and context to the first user message
    let promptText = message;
    if (additionalContext) {
      promptText = `I'm a travel assistant. Please help with this travel query: "${message}"\n\nContextual information: ${additionalContext}\n\nProvide specific, detailed and concise travel advice.`;
    } else {
      promptText = `I'm a travel assistant. Please help with this travel query: "${message}"\n\nProvide specific, detailed and concise travel advice.`;
    }
    
    // Update the first user message with the prompt text
    const updatedMessages = [...formattedMessages];
    updatedMessages[updatedMessages.length - 1].parts[0].text = promptText;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: updatedMessages,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(errorData.error?.message || 'Error calling Gemini API');
    }

    const data = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }
    
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Create assistant message
    const assistantMessage: ChatMessage = {
      id: `msg-assistant-${Date.now()}`,
      content: responseText,
      role: "assistant",
      timestamp: new Date(),
    };
    
    // Add to chat history for future context
    chatHistory.push(assistantMessage);
    
    // Keep only the last 10 messages to manage context size
    if (chatHistory.length > 10) {
      chatHistory = chatHistory.slice(chatHistory.length - 10);
    }
    
    return assistantMessage;
  } catch (error) {
    console.error("Error sending chat message:", error);
    toast({
      title: "Failed to send message",
      description: "There was an error processing your message. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

export const clearChatHistory = () => {
  chatHistory = [];
};
