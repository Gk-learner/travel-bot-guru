
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Users, DollarSign, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import LocationInput from './LocationInput';
import { TravelFormData } from '@/pages/Index';

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  loading: boolean;
}

const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, loading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TravelFormData>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    travelers: 2,
    budget: 2000,
    source: '',
    destination: '',
  });

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: keyof TravelFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isDateValid = formData.startDate && formData.endDate && formData.endDate >= formData.startDate;
  const isLocationValid = formData.source && formData.destination;
  const isBudgetValid = formData.budget > 0 && formData.travelers > 0;

  const canContinue = 
    (currentStep === 1 && isDateValid) || 
    (currentStep === 2 && isLocationValid) || 
    (currentStep === 3 && isBudgetValid);

  return (
    <div className="glass-container rounded-xl p-6 w-full max-w-2xl mx-auto transition-all duration-500 animate-scale-in">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  currentStep === step
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {currentStep > step ? "✓" : step}
              </div>
              {step < 3 && (
                <div
                  className={cn(
                    "h-[2px] w-8",
                    currentStep > step ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of 3
        </p>
      </div>

      {/* Step 1: Date Selection */}
      <div className={cn("space-y-6 transition-all duration-500", currentStep === 1 ? "block" : "hidden")}>
        <h2 className="text-2xl font-medium">When are you traveling?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="start-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left",
                    !formData.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.startDate ? (
                    format(formData.startDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.startDate}
                  onSelect={(date) => date && updateFormData('startDate', date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="end-date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left",
                    !formData.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.endDate ? (
                    format(formData.endDate, "PPP")
                  ) : (
                    <span>Select date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.endDate}
                  onSelect={(date) => date && updateFormData('endDate', date)}
                  disabled={(date) => date < formData.startDate || date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {!isDateValid && (
          <p className="text-sm text-destructive">Please select valid dates for your trip.</p>
        )}
      </div>

      {/* Step 2: Location Selection */}
      <div className={cn("space-y-6 transition-all duration-500", currentStep === 2 ? "block" : "hidden")}>
        <h2 className="text-2xl font-medium">Where are you traveling?</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="source">Departure Location</Label>
            <LocationInput
              id="source"
              placeholder="Where are you traveling from?"
              value={formData.source}
              onChange={(value) => updateFormData('source', value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <LocationInput
              id="destination"
              placeholder="Where are you going to?"
              value={formData.destination}
              onChange={(value) => updateFormData('destination', value)}
            />
          </div>
        </div>
        
        {!isLocationValid && (
          <p className="text-sm text-destructive">Please enter both departure and destination locations.</p>
        )}
      </div>

      {/* Step 3: Travelers and Budget */}
      <div className={cn("space-y-6 transition-all duration-500", currentStep === 3 ? "block" : "hidden")}>
        <h2 className="text-2xl font-medium">Final details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="travelers">Number of Travelers</Label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="travelers"
                type="number"
                min={1}
                value={formData.travelers}
                onChange={(e) => updateFormData('travelers', parseInt(e.target.value) || 1)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget">Budget (USD)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="budget"
                type="number"
                min={100}
                step={100}
                value={formData.budget}
                onChange={(e) => updateFormData('budget', parseInt(e.target.value) || 500)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        {!isBudgetValid && (
          <p className="text-sm text-destructive">Please enter valid traveler count and budget.</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1 || loading}
          className="transition-all duration-300"
        >
          Back
        </Button>
        
        <Button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue || loading}
          className="transition-all duration-300 min-w-[120px]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : currentStep < 3 ? (
            "Continue"
          ) : (
            "Get Itinerary"
          )}
        </Button>
      </div>
    </div>
  );
};

export default TravelForm;
