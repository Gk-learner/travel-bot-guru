
import React from 'react';
import Header from '@/components/Header';
import TravelForm from '@/components/TravelForm';
import TravelResults from '@/components/TravelResults';
import AnimatedBackground from '@/components/AnimatedBackground';
import ApiKeyInput from '@/components/ApiKeyInput';
import { generateTripsWithGemini } from '@/services/geminiService';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [travelData, setTravelData] = React.useState<TravelFormData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [apiKey, setApiKey] = React.useState<string | null>(null);
  const [tripSuggestions, setTripSuggestions] = React.useState<TripSuggestion[]>([]);
  const { toast } = useToast();
  
  // Handle API key changes
  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };
  
  // Handle form submission
  const handleFormSubmit = async (data: TravelFormData) => {
    setLoading(true);
    
    try {
      // Check if API key is available
      if (!apiKey) {
        toast({
          title: "API key required",
          description: "Please set your Gemini API key to generate travel suggestions.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Call Gemini API to generate trip suggestions
      const suggestions = await generateTripsWithGemini(apiKey, data);
      setTripSuggestions(suggestions);
      setTravelData(data);
    } catch (error) {
      console.error('Error generating trips:', error);
      toast({
        title: "Error generating trips",
        description: error instanceof Error ? error.message : "Failed to generate trip suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    setTravelData(null);
    setTripSuggestions([]);
  };
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      <AnimatedBackground />
      <ApiKeyInput onApiKeyChange={handleApiKeyChange} />
      
      <div className="relative z-10 flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-fade-in w-full max-w-4xl mx-auto">
            {!travelData ? (
              <div className="animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-light text-center mb-2 tracking-tight">
                  Plan Your Perfect Journey
                </h1>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Our AI travel assistant will create a personalized itinerary based on your preferences.
                </p>
                <TravelForm onSubmit={handleFormSubmit} loading={loading} />
              </div>
            ) : (
              <TravelResults 
                data={travelData} 
                onReset={handleReset} 
                tripSuggestions={tripSuggestions}
                loading={loading}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

// Type definitions for the application
export interface TravelFormData {
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: number;
  source: string;
  destination: string;
  includeTransportation?: boolean;
}

export interface TripSuggestion {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  highlights: string[];
}
