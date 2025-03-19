
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import TripCard from './TripCard';
import { TravelFormData, TripSuggestion } from '@/pages/Index';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface TravelResultsProps {
  data: TravelFormData;
  onReset: () => void;
  tripSuggestions: TripSuggestion[];
  loading: boolean;
}

const TravelResults: React.FC<TravelResultsProps> = ({ 
  data, 
  onReset, 
  tripSuggestions,
  loading 
}) => {
  const [showMore, setShowMore] = useState(false);
  
  // Calculate trip summary data
  const durationInDays = Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24));
  const formattedStartDate = data.startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedEndDate = data.endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  // Determine how many trips to display
  const displayedTrips = showMore ? tripSuggestions : tripSuggestions.slice(0, 2);
  
  const renderResults = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
          <p className="text-center text-muted-foreground">
            Our AI is creating personalized trip suggestions just for you...
          </p>
        </div>
      );
    }
    
    if (tripSuggestions.length === 0) {
      return (
        <Alert className="my-8">
          <AlertDescription>
            No trip suggestions available. Please try again with different criteria.
          </AlertDescription>
        </Alert>
      );
    }
    
    return (
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
    );
  };
  
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
      
      {renderResults()}
    </div>
  );
};

export default TravelResults;
