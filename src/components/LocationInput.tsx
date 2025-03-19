
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

// Mock location suggestions data
const mockLocations = [
  "New York, USA",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Rome, Italy",
  "Barcelona, Spain",
  "Berlin, Germany",
  "Singapore",
  "Dubai, UAE",
  "Amsterdam, Netherlands",
  "Hong Kong",
  "Istanbul, Turkey",
  "Bangkok, Thailand",
  "Bali, Indonesia"
];

const LocationInput: React.FC<LocationInputProps> = ({ id, placeholder, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter locations based on input
  const filterLocations = (input: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = mockLocations.filter(location => 
        location.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filtered);
      setIsLoading(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    if (newValue.length > 1) {
      filterLocations(newValue);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    onChange(suggestion);
    setSuggestions([]);
    setIsFocused(false);
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
            <div className="p-4 text-sm text-muted-foreground">
              No locations found. Try a different search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
