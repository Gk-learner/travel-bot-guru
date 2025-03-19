
import React from 'react';
import { 
  FlightOption, 
  formatDuration, 
  formatDateTime 
} from '@/services/flightService';
import { 
  Plane, 
  Clock, 
  DollarSign, 
  Leaf,
  ArrowRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FlightDetailsProps {
  flightOption: FlightOption;
  isSelected?: boolean;
  onSelect?: () => void;
}

const FlightDetails: React.FC<FlightDetailsProps> = ({ 
  flightOption,
  isSelected,
  onSelect
}) => {
  const { flights, layovers, total_duration, price, carbon_emissions } = flightOption;
  const firstFlight = flights[0];
  const lastFlight = flights[flights.length - 1];
  
  // Formatter for price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
  
  // Calculate carbon emission difference indicator
  const getCarbonIndicator = () => {
    const diff = carbon_emissions.difference_percent;
    if (diff <= 0) return { text: 'Average emissions', color: 'bg-green-100 text-green-800' };
    if (diff <= 10) return { text: 'Slightly higher emissions', color: 'bg-yellow-100 text-yellow-800' };
    return { text: `${diff}% higher emissions`, color: 'bg-red-100 text-red-800' };
  };
  
  const carbonIndicator = getCarbonIndicator();
  
  return (
    <div className={`border rounded-lg p-4 mb-4 transition-all ${isSelected ? 'border-primary' : 'border-border'}`}>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <img 
            src={firstFlight.airline_logo} 
            alt={firstFlight.airline} 
            className="h-6 w-6 object-contain"
          />
          <div>
            <span className="font-medium">{firstFlight.airline}</span>
            {flights.length > 1 && (
              <span className="text-sm text-muted-foreground ml-2">+{flights.length - 1} more</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{formatDuration(total_duration)}</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="font-medium">{formattedPrice}</span>
          </div>
          <Badge variant="outline" className={carbonIndicator.color}>
            <Leaf className="h-3 w-3 mr-1" />
            {carbonIndicator.text}
          </Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-1">
          <div className="text-sm text-muted-foreground mb-1">Departure</div>
          <div className="font-medium">
            {formatDateTime(firstFlight.departure_airport.time).time}
          </div>
          <div>{firstFlight.departure_airport.name}</div>
          <div className="text-sm text-muted-foreground">
            {formatDateTime(firstFlight.departure_airport.time).date}
          </div>
        </div>
        
        <div className="col-span-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground mb-2">
              {flights.length - 1} stops • {layovers.length} layovers
            </div>
            <div className="flex items-center w-full">
              <div className="h-0.5 w-1/3 bg-border"></div>
              <ArrowRight className="h-4 w-4 mx-2 text-muted-foreground" />
              <div className="h-0.5 w-1/3 bg-border"></div>
            </div>
          </div>
        </div>
        
        <div className="col-span-1 text-right">
          <div className="text-sm text-muted-foreground mb-1">Arrival</div>
          <div className="font-medium">
            {formatDateTime(lastFlight.arrival_airport.time).time}
          </div>
          <div>{lastFlight.arrival_airport.name}</div>
          <div className="text-sm text-muted-foreground">
            {formatDateTime(lastFlight.arrival_airport.time).date}
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex flex-wrap gap-2">
          {flights.map((flight, index) => (
            <Badge key={index} variant="outline" className="bg-background">
              <Plane className="h-3 w-3 mr-1" />
              {flight.flight_number}
            </Badge>
          ))}
        </div>
      </div>
      
      {onSelect && (
        <div className="mt-4 flex justify-end">
          <Button 
            variant={isSelected ? "default" : "outline"} 
            onClick={onSelect}
            className="min-w-32"
          >
            {isSelected ? "Selected" : "Select Flight"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FlightDetails;
