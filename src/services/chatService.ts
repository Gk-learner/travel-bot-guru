
import { toast } from "@/components/ui/use-toast";

export type ChatMessage = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

// This is a mock implementation that would be replaced with a real API call in production
export const sendChatMessage = async (message: string, apiKey: string): Promise<ChatMessage> => {
  // In a real implementation, this would call the Gemini API
  // For now we'll simulate a response
  
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response: ChatMessage = {
      id: `msg-${Date.now()}`,
      content: generateMockResponse(message),
      role: "assistant",
      timestamp: new Date(),
    };
    
    return response;
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

// Generate mock responses based on keywords in the user's message
const generateMockResponse = (message: string): string => {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes("hotel") || lowercaseMessage.includes("accommodation")) {
    return "I recommend looking at hotels in the central areas of your destination. For New York, consider staying in Midtown for easy access to major attractions. Budget hotels start around $150 per night, while luxury options can range from $300-$500+.";
  }
  
  if (lowercaseMessage.includes("restaurant") || lowercaseMessage.includes("food") || lowercaseMessage.includes("eat")) {
    return "Your destination offers a wide variety of dining options. New York is known for its diverse food scene, from famous pizza places to Michelin-starred restaurants. I suggest trying local specialties and exploring different neighborhoods for authentic experiences.";
  }
  
  if (lowercaseMessage.includes("attraction") || lowercaseMessage.includes("visit") || lowercaseMessage.includes("see")) {
    return "Some must-see attractions at your destination include major landmarks and cultural sites. In New York, don't miss the Empire State Building, Central Park, Metropolitan Museum of Art, and the Statue of Liberty. Consider getting a city pass if you plan to visit multiple attractions.";
  }
  
  if (lowercaseMessage.includes("transport") || lowercaseMessage.includes("getting around") || lowercaseMessage.includes("subway")) {
    return "Public transportation is usually the most efficient way to get around in major cities. New York has an extensive subway system that runs 24/7. A weekly MetroCard might be cost-effective if you're staying for your full trip duration.";
  }
  
  // Default response
  return "Thank you for your question about your trip. Could you provide more details about what specific information you're looking for regarding your itinerary?";
};
