import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { MapPin, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationInputProps {
  id: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

// Enhanced location suggestions with additional countries and broader matching
const locationSuggestions = [
  // Countries
  "Canada", "United States", "Mexico", "Brazil", "Argentina", "United Kingdom", "France", "Germany", 
  "Italy", "Spain", "Portugal", "Netherlands", "Belgium", "Switzerland", "Austria", "Greece", 
  "Sweden", "Norway", "Denmark", "Finland", "Russia", "China", "Japan", "South Korea", "India", 
  "Thailand", "Vietnam", "Singapore", "Indonesia", "Australia", "New Zealand", "South Africa", 
  "Morocco", "Egypt", "Israel", "Turkey", "United Arab Emirates", "Kenya", "Nigeria",
  
  // Major global cities (keeping the current extensive list)
  "New York, USA", "Los Angeles, USA", "Chicago, USA", "Houston, USA", "Miami, USA", "San Francisco, USA", "Seattle, USA", "Boston, USA", "Las Vegas, USA", "Atlanta, USA", "Dallas, USA", "Denver, USA", "Phoenix, USA", "San Diego, USA", "Austin, USA", "Philadelphia, USA", "Indianapolis, USA", "Nashville, USA", "New Orleans, USA", "Portland, USA",
  "London, UK", "Manchester, UK", "Birmingham, UK", "Edinburgh, UK", "Glasgow, UK", "Liverpool, UK", "Bristol, UK", "Brighton, UK", "Oxford, UK", "Cambridge, UK",
  "Paris, France", "Marseille, France", "Lyon, France", "Nice, France", "Bordeaux, France", "Toulouse, France", "Strasbourg, France", "Montpellier, France", "Lille, France", "Nantes, France",
  "Berlin, Germany", "Munich, Germany", "Hamburg, Germany", "Frankfurt, Germany", "Cologne, Germany", "Düsseldorf, Germany", "Stuttgart, Germany", "Dresden, Germany", "Leipzig, Germany", "Hannover, Germany",
  "Rome, Italy", "Milan, Italy", "Naples, Italy", "Turin, Italy", "Palermo, Italy", "Bologna, Italy", "Florence, Italy", "Venice, Italy", "Verona, Italy", "Genoa, Italy",
  "Madrid, Spain", "Barcelona, Spain", "Valencia, Spain", "Seville, Spain", "Málaga, Spain", "Bilbao, Spain", "Alicante, Spain", "Zaragoza, Spain", "Granada, Spain", "Palma de Mallorca, Spain",
  
  // Asia
  "Tokyo, Japan", "Osaka, Japan", "Kyoto, Japan", "Sapporo, Japan", "Fukuoka, Japan", "Nagoya, Japan", "Yokohama, Japan", "Hiroshima, Japan", "Kobe, Japan", "Nara, Japan",
  "Beijing, China", "Shanghai, China", "Guangzhou, China", "Shenzhen, China", "Chengdu, China", "Xi'an, China", "Hangzhou, China", "Chongqing, China", "Nanjing, China", "Wuhan, China",
  "Seoul, South Korea", "Busan, South Korea", "Incheon, South Korea", "Daegu, South Korea", "Daejeon, South Korea", "Gwangju, South Korea", "Suwon, South Korea", "Ulsan, South Korea", "Seongnam, South Korea", "Jeju, South Korea",
  "Mumbai, India", "Delhi, India", "Bangalore, India", "Hyderabad, India", "Chennai, India", "Kolkata, India", "Pune, India", "Ahmedabad, India", "Jaipur, India", "Lucknow, India",
  "Bangkok, Thailand", "Chiang Mai, Thailand", "Phuket, Thailand", "Pattaya, Thailand", "Krabi, Thailand", "Koh Samui, Thailand", "Hua Hin, Thailand", "Ayutthaya, Thailand", "Khon Kaen, Thailand", "Chiang Rai, Thailand",
  "Singapore", "Kuala Lumpur, Malaysia", "Penang, Malaysia", "Johor Bahru, Malaysia", "Kuching, Malaysia", "Kota Kinabalu, Malaysia", "Malacca, Malaysia", "Ipoh, Malaysia", "Langkawi, Malaysia", "Cameron Highlands, Malaysia",
  
  // Middle East
  "Dubai, UAE", "Abu Dhabi, UAE", "Sharjah, UAE", "Doha, Qatar", "Riyadh, Saudi Arabia", "Jeddah, Saudi Arabia", "Istanbul, Turkey", "Ankara, Turkey", "Antalya, Turkey", "Izmir, Turkey",
  "Tel Aviv, Israel", "Jerusalem, Israel", "Cairo, Egypt", "Alexandria, Egypt", "Marrakech, Morocco", "Casablanca, Morocco", "Tunis, Tunisia", "Algiers, Algeria",
  
  // Australia & Oceania
  "Sydney, Australia", "Melbourne, Australia", "Brisbane, Australia", "Perth, Australia", "Adelaide, Australia", "Gold Coast, Australia", "Cairns, Australia", "Darwin, Australia", "Hobart, Australia", "Canberra, Australia",
  "Auckland, New Zealand", "Wellington, New Zealand", "Christchurch, New Zealand", "Queenstown, New Zealand", "Rotorua, New Zealand", "Hamilton, New Zealand", "Tauranga, New Zealand", "Dunedin, New Zealand", "Napier, New Zealand", "Nelson, New Zealand",
  "Suva, Fiji", "Nadi, Fiji", "Honolulu, Hawaii", "Bora Bora, French Polynesia", "Tahiti, French Polynesia", "Nouméa, New Caledonia", "Port Vila, Vanuatu", "Apia, Samoa",
  
  // South America
  "Rio de Janeiro, Brazil", "São Paulo, Brazil", "Brasília, Brazil", "Salvador, Brazil", "Fortaleza, Brazil", "Recife, Brazil", "Manaus, Brazil", "Florianópolis, Brazil", "Porto Alegre, Brazil", "Curitiba, Brazil",
  "Buenos Aires, Argentina", "Córdoba, Argentina", "Mendoza, Argentina", "Bariloche, Argentina", "Santiago, Chile", "Valparaíso, Chile", "Lima, Peru", "Cusco, Peru", "Bogotá, Colombia", "Cartagena, Colombia",
  "Medellín, Colombia", "Quito, Ecuador", "Guayaquil, Ecuador", "Montevideo, Uruguay", "Punta del Este, Uruguay", "La Paz, Bolivia", "Sucre, Bolivia", "Asunción, Paraguay", "Caracas, Venezuela",
  
  // Africa
  "Cape Town, South Africa", "Johannesburg, South Africa", "Durban, South Africa", "Nairobi, Kenya", "Mombasa, Kenya", "Lagos, Nigeria", "Abuja, Nigeria", "Accra, Ghana", "Dakar, Senegal", "Zanzibar, Tanzania",
  "Dar es Salaam, Tanzania", "Addis Ababa, Ethiopia", "Casablanca, Morocco", "Marrakech, Morocco", "Fez, Morocco", "Luxor, Egypt", "Sharm El Sheikh, Egypt", "Hurghada, Egypt", "Windhoek, Namibia", "Victoria Falls, Zimbabwe",
  
  // Eastern Europe
  "Prague, Czech Republic", "Vienna, Austria", "Budapest, Hungary", "Warsaw, Poland", "Krakow, Poland", "Moscow, Russia", "St. Petersburg, Russia", "Kiev, Ukraine", "Bucharest, Romania", "Sofia, Bulgaria",
  "Zagreb, Croatia", "Ljubljana, Slovenia", "Tallinn, Estonia", "Riga, Latvia", "Vilnius, Lithuania", "Belgrade, Serbia", "Bratislava, Slovakia", "Dubrovnik, Croatia", "Split, Croatia",
  
  // Caribbean
  "Havana, Cuba", "Cancun, Mexico", "Punta Cana, Dominican Republic", "San Juan, Puerto Rico", "Nassau, Bahamas", "Montego Bay, Jamaica", "Bridgetown, Barbados", "St. George's, Grenada", "Castries, St. Lucia", "Oranjestad, Aruba",
  "Willemstad, Curaçao", "Saint-Martin", "George Town, Cayman Islands", "Philipsburg, Sint Maarten",
  
  // Northern Europe
  "Stockholm, Sweden", "Copenhagen, Denmark", "Oslo, Norway", "Helsinki, Finland", "Reykjavik, Iceland", "Gothenburg, Sweden", "Malmö, Sweden", "Bergen, Norway", "Turku, Finland", "Aarhus, Denmark",
  
  // Benelux
  "Amsterdam, Netherlands", "Rotterdam, Netherlands", "Utrecht, Netherlands", "The Hague, Netherlands", "Brussels, Belgium", "Antwerp, Belgium", "Ghent, Belgium", "Bruges, Belgium", "Luxembourg City, Luxembourg"
];

const LocationInput: React.FC<LocationInputProps> = ({ id, placeholder, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allowFreeInput, setAllowFreeInput] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Update input value when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        // When losing focus, accept the current input value even if not in suggestions
        if (inputValue && inputValue.trim() !== value) {
          onChange(inputValue.trim());
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputValue, value, onChange]);

  // Filter locations based on input with improved matching
  const filterLocations = (input: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (!input.trim()) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      const searchTerms = input.toLowerCase().split(' ').filter(term => term.length > 0);
      
      // Score-based fuzzy matching
      const scoredLocations = locationSuggestions.map(location => {
        const locationLower = location.toLowerCase();
        let score = 0;
        
        // Exact match gets highest score
        if (locationLower === input.toLowerCase()) {
          score += 100;
        }
        
        // Starts with input gets high score
        if (locationLower.startsWith(input.toLowerCase())) {
          score += 50;
        }
        
        // Contains all search terms
        const containsAllTerms = searchTerms.every(term => locationLower.includes(term));
        if (containsAllTerms) {
          score += 25;
        }
        
        // Score based on how many terms match
        searchTerms.forEach(term => {
          if (locationLower.includes(term)) {
            score += 10;
          }
        });
        
        return { location, score };
      });
      
      // Filter and sort by score
      const filteredLocations = scoredLocations
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.location)
        .slice(0, 8); // Limit to top 8 matches
      
      setSuggestions(filteredLocations);
      
      // If no matches and input is meaningful, allow free input
      if (filteredLocations.length === 0 && input.length > 2) {
        setAllowFreeInput(true);
      } else {
        setAllowFreeInput(false);
      }
      
      setIsLoading(false);
    }, 150); // Reduced delay for better responsiveness
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (newValue.length > 1) {
      filterLocations(newValue);
    } else {
      setSuggestions([]);
      setAllowFreeInput(false);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setSuggestions([]);
    setIsFocused(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (allowFreeInput || suggestions.length > 0) {
        // If we have a selected suggestion, use it, otherwise use the input value
        if (suggestions.length > 0) {
          handleSelectSuggestion(suggestions[0]);
        } else {
          onChange(inputValue.trim());
          setSuggestions([]);
          setIsFocused(false);
        }
      }
    }
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    setSuggestions([]);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          className={cn("pl-10 pr-10 transition-all duration-300", 
            isFocused ? "border-primary ring-1 ring-primary/20" : ""
          )}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {isFocused && inputValue.length > 1 && (
        <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white rounded-md shadow-lg border border-border animate-fade-in">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center text-sm text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching locations...
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  className="px-4 py-2 text-sm hover:bg-muted cursor-pointer transition-colors flex items-center"
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <MapPin className="mr-2 h-4 w-4 text-primary/70" />
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 space-y-3">
              <p className="text-sm text-muted-foreground">
                No exact matches found.
              </p>
              {allowFreeInput && (
                <div 
                  className="flex items-center px-4 py-2 bg-primary/10 rounded-md cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => handleSelectSuggestion(inputValue)}
                >
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  <span>Use "{inputValue}"</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
