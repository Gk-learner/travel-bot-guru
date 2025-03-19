
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import TripCard from './TripCard';
import { TravelFormData, TripSuggestion } from '@/pages/Index';

// Mock images for trip suggestions
const mockImages = [
  "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2940&auto=format&fit=crop",
];

// Function to generate mock trip data based on user input
const generateTripSuggestions = (data: TravelFormData): TripSuggestion[] => {
  const durationInDays = Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24));
  const budgetPerDay = data.budget / durationInDays;
  
  return [
    {
      id: "trip-1",
      title: `${durationInDays}-Day Adventure in ${data.destination}`,
      description: `A perfect itinerary for ${data.travelers} traveler${data.travelers > 1 ? 's' : ''} exploring the wonders of ${data.destination} from ${data.source}.`,
      price: Math.round(data.budget * 0.8), // Slightly under budget
      duration: durationInDays,
      image: mockImages[0],
      highlights: [
        "Premium accommodations in central locations",
        "Private guided tours of main attractions",
        "Transportation included between all destinations",
        "Breakfast included at all hotels"
      ]
    },
    {
      id: "trip-2",
      title: `Luxury Experience: ${data.destination} Getaway`,
      description: `An upscale journey from ${data.source} to ${data.destination} with premium accommodations and experiences.`,
      price: Math.round(data.budget * 1.1), // Slightly over budget
      duration: durationInDays,
      image: mockImages[1],
      highlights: [
        "5-star luxury accommodations",
        "Private transfers throughout your journey",
        "Exclusive access to popular attractions",
        "Personalized concierge service"
      ]
    },
    {
      id: "trip-3",
      title: `Budget-Friendly ${data.destination} Explorer`,
      description: `Experience the best of ${data.destination} without breaking the bank, perfect for ${data.travelers} traveler${data.travelers > 1 ? 's' : ''}.`,
      price: Math.round(data.budget * 0.6), // Significantly under budget
      duration: durationInDays,
      image: mockImages[2],
      highlights: [
        "Comfortable 3-star accommodations",
        "Group tours of popular attractions",
        "Public transportation passes included",
        "Self-guided itinerary options"
      ]
    },
    {
      id: "trip-4",
      title: `Authentic ${data.destination} Experience`,
      description: `Immerse yourself in the local culture of ${data.destination} with this carefully curated itinerary.`,
      price: Math.round(data.budget * 0.75), // Under budget
      duration: durationInDays,
      image: mockImages[3],
      highlights: [
        "Boutique hotels in authentic neighborhoods",
        "Local food and cultural experiences",
        "Off-the-beaten-path attractions",
        "Meet with locals and experience traditions"
      ]
    }
  ];
};

interface TravelResultsProps {
  data: TravelFormData;
  onReset: () => void;
}

const TravelResults: React.FC<TravelResultsProps> = ({ data, onReset }) => {
  const [tripSuggestions, setTripSuggestions] = useState<TripSuggestion[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call delay
    setLoading(true);
    setTimeout(() => {
      const suggestions = generateTripSuggestions(data);
      setTripSuggestions(suggestions);
      setLoading(false);
    }, 1000);
  }, [data]);
  
  // Calculate trip summary data
  const durationInDays = Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24));
  const formattedStartDate = data.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedEndDate = data.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  // Determine how many trips to display
  const displayedTrips = showMore ? tripSuggestions : tripSuggestions.slice(0, 2);
  
  return (
    <div className="w-full animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={onReset} 
        className="mb-6 group transition-all duration-300 -ml-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to search
      </Button>
      
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight">Your Travel Plan</h1>
        
        <div className="glass-container rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <div>
              <span className="text-muted-foreground">From</span>{" "}
              <span className="font-medium">{data.source}</span>
            </div>
            <div>
              <span className="text-muted-foreground">To</span>{" "}
              <span className="font-medium">{data.destination}</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <div>
              <span className="text-muted-foreground">Dates</span>{" "}
              <span className="font-medium">{formattedStartDate} - {formattedEndDate}</span>{" "}
              <span className="text-muted-foreground">({durationInDays} days)</span>
            </div>
            <div>
              <span className="text-muted-foreground">Travelers</span>{" "}
              <span className="font-medium">{data.travelers}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Budget</span>{" "}
              <span className="font-medium">${data.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="w-full h-64 bg-muted/50 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-6">
            {displayedTrips.map((trip, index) => (
              <div key={trip.id} className="animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <TripCard trip={trip} index={index} />
              </div>
            ))}
          </div>
          
          {tripSuggestions.length > 2 && (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowMore(!showMore)}
                className="group"
              >
                {showMore ? (
                  <>
                    Show less
                    <ChevronUp className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  </>
                ) : (
                  <>
                    Show more options
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelResults;
