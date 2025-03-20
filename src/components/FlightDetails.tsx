
import React, { useState } from 'react';
import { 
  FlightOption, 
  formatDuration, 
  formatDateTime,
  bookFlight
} from '@/services/flightService';
import { 
  Plane, 
  Clock, 
  DollarSign, 
  Leaf,
  ArrowRight,
  Loader2,
  Check,
  XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

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
  const { flights, layovers, total_duration, price, carbon_emissions, booking_token } = flightOption;
  const [booking, setBooking] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const { toast } = useToast();
  
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

  // Handle booking
  const handleBooking = async () => {
    try {
      setBooking('loading');
      const result = await bookFlight(booking_token);
      
      if (result.success) {
        setBooking('success');
        setConfirmationCode(result.confirmationCode || null);
        toast({
          title: "Booking Successful",
          description: result.message,
          variant: "default",
        });
      } else {
        setBooking('error');
        toast({
          title: "Booking Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      setBooking('error');
      toast({
        title: "Booking Error",
        description: "An unexpected error occurred while booking your flight.",
        variant: "destructive",
      });
    }
  };
  
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
      
      <div className="mt-4 flex justify-end">
        {onSelect && (
          <Button 
            variant={isSelected ? "default" : "outline"} 
            onClick={onSelect}
            className="min-w-32 mr-2"
            disabled={booking === 'loading' || booking === 'success'}
          >
            {isSelected ? "Selected" : "Select Flight"}
          </Button>
        )}
        
        {booking === 'idle' && (
          <Button 
            onClick={handleBooking}
            className="min-w-32 bg-primary hover:bg-primary/90"
          >
            Book Now
          </Button>
        )}
        
        {booking === 'loading' && (
          <Button 
            disabled
            className="min-w-32"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Booking...
          </Button>
        )}
        
        {booking === 'success' && (
          <div className="flex flex-col items-end">
            <Button 
              variant="outline"
              className="min-w-32 text-green-600 border-green-600"
              disabled
            >
              <Check className="mr-2 h-4 w-4" />
              Booked
            </Button>
            {confirmationCode && (
              <span className="text-xs text-muted-foreground mt-1">
                Confirmation: {confirmationCode}
              </span>
            )}
          </div>
        )}
        
        {booking === 'error' && (
          <Button 
            onClick={handleBooking}
            variant="outline"
            className="min-w-32 text-destructive border-destructive hover:bg-destructive/10"
          >
            <XCircle className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default FlightDetails;
