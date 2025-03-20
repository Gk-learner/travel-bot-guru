
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TripSuggestion } from '@/pages/Index';
import { CalendarIcon, Users, DollarSign, CheckCircle, MapPin } from 'lucide-react';

interface TripCardProps {
  trip: TripSuggestion;
  index: number;
}

const TripCard: React.FC<TripCardProps> = ({ trip, index }) => {
  // Determine if the trip is recommended (in this case, first one)
  const isRecommended = index === 0;
  
  // Sample destination images
  const destinationImages = [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&h=600&q=80',
    'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&h=600&q=80',
  ];
  
  // Use trip.image if provided, otherwise use one of our sample images
  const displayImage = trip.image || destinationImages[index % destinationImages.length];
  
  // Placeholder click handler
  const handleBookNow = () => {
    console.log('Book now clicked for trip:', trip.id);
    alert('This is a demo - booking functionality would be implemented in a real application!');
  };
  
  return (
    <div className={`glass-card rounded-xl overflow-hidden transition-all duration-500 hover:shadow-md
      ${isRecommended ? 'border-primary/30' : 'border-border'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="destination-card relative h-48 md:h-full">
          <img 
            src={displayImage} 
            alt={trip.title} 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
          />
          <div className="absolute bottom-4 left-4 z-20 flex items-center text-white">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{trip.title.split(' - ')[0]}</span>
          </div>
          {isRecommended && (
            <div className="absolute top-4 left-4 z-20">
              <Badge variant="default" className="bg-primary/90 hover:bg-primary px-3 py-1">
                Recommended
              </Badge>
            </div>
          )}
        </div>
        
        <div className="col-span-2 p-6">
          <div className="flex flex-col h-full">
            <div className="mb-4">
              <h3 className="text-xl font-medium mb-2">{trip.title}</h3>
              <p className="text-muted-foreground text-sm">{trip.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-primary/80" />
                <span>{trip.duration} days</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-primary/80" />
                <span>${trip.price.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-primary/80" />
                <span>Per group</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {trip.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-primary/80 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-auto">
              <Button 
                onClick={handleBookNow} 
                className={`w-full md:w-auto button-hover-effect ${isRecommended ? 'bg-accent hover:bg-accent/90 text-white' : 'bg-primary/90 hover:bg-primary'}`}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
