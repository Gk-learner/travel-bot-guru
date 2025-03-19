
import React from 'react';
import { PlaneTakeoff, Clock, DollarSign } from 'lucide-react';
import { FlightData } from '@/pages/Index';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface FlightSearchResultsProps {
  flights: FlightData[] | null;
  isLoading: boolean;
  error: string | null;
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({ 
  flights, 
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 mt-4">
        <h3 className="text-lg font-medium">Finding the best flights for you...</h3>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[60px]" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-6 w-[70px]" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mt-4 bg-red-50 text-red-600 rounded-md">
        <h3 className="font-medium">Error finding flights</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-xl font-medium flex items-center gap-2">
        <PlaneTakeoff className="h-5 w-5" />
        Flight Options
      </h3>
      
      <div className="grid gap-4">
        {flights.map((flight, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-medium">{flight.airline}</div>
                <div className="text-sm text-muted-foreground">Flight {flight.flightNumber}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                  <div className="text-lg font-medium">{flight.departureTime}</div>
                  <div className="text-muted-foreground">→</div>
                  <div className="text-lg font-medium">{flight.arrivalTime}</div>
                </div>
                
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{flight.duration}</span>
                  <span className="mx-1">•</span>
                  <span>{flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-border/60">
                <div className="text-sm text-muted-foreground">
                  {index === 0 && <span className="text-green-600 font-medium">Best Value</span>}
                  {index === 1 && flights.length > 2 && <span className="text-blue-600 font-medium">Fastest</span>}
                </div>
                <div className="flex items-center font-semibold text-lg">
                  <DollarSign className="h-4 w-4" />
                  {flight.price}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchResults;
