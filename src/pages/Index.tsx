
import React from 'react';
import Header from '@/components/Header';
import TravelForm from '@/components/TravelForm';
import TravelResults from '@/components/TravelResults';
import AnimatedBackground from '@/components/AnimatedBackground';

const Index = () => {
  const [travelData, setTravelData] = React.useState<TravelFormData | null>(null);
  const [loading, setLoading] = React.useState(false);
  
  // Handle form submission
  const handleFormSubmit = (data: TravelFormData) => {
    setLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setTravelData(data);
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col">
      <AnimatedBackground />
      
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
              <TravelResults data={travelData} onReset={() => setTravelData(null)} />
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
