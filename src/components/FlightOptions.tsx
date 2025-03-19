
import React, { useState, useEffect } from 'react';
import { fetchFlightData, FlightOption } from '@/services/flightService';
import FlightDetails from './FlightDetails';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TravelFormData } from '@/pages/Index';

interface FlightOptionsProps {
  travelData: TravelFormData;
}

const FlightOptions: React.FC<FlightOptionsProps> = ({ travelData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>([]);
  const [selectedFlightIndex, setSelectedFlightIndex] = useState<number | null>(null);
  
  useEffect(() => {
    const loadFlightData = async () => {
      try {
        setLoading(true);
        const data = await fetchFlightData(
          travelData.source, 
          travelData.destination, 
          travelData.startDate
        );
        setFlightOptions(data.best_flights);
        setSelectedFlightIndex(0); // Auto-select the first option
      } catch (err) {
        console.error('Error fetching flight data:', err);
        setError('Failed to load flight options. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadFlightData();
  }, [travelData]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-8 space-y-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="text-center text-muted-foreground">
          Loading flight options...
        </p>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert className="my-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  if (flightOptions.length === 0) {
    return (
      <Alert className="my-4">
        <AlertDescription>
          No flight options available for your selected route.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-medium mb-4">Flight Options</h2>
      
      {flightOptions.map((option, index) => (
        <FlightDetails
          key={index}
          flightOption={option}
          isSelected={selectedFlightIndex === index}
          onSelect={() => setSelectedFlightIndex(index)}
        />
      ))}
    </div>
  );
};

export default FlightOptions;
