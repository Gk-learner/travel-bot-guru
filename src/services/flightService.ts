// Mock response generator for flight data
const generateMockFlightData = (source: string, destination: string, date: Date): any => {
  // Generate different flight options based on destination
  const destinationAirport = getDestinationAirport(destination);
  const sourceAirport = getSourceAirport(source);
  
  // Format date for flight times
  const dateStr = date.toISOString().split('T')[0];
  const baseTime = new Date(date);
  
  // Ensure we get diverse airlines for each option
  const selectedAirlines = selectDiverseAirlines(3);
  const selectedAirlineCodes = selectedAirlines.map((_, index) => airlineCodes[index % airlineCodes.length]);
  
  return {
    "best_flights": [
      {
        "flights": [
          {
            "departure_airport": {
              "name": sourceAirport.name,
              "id": sourceAirport.code,
              "time": `${dateStr} ${formatTime(baseTime)}`
            },
            "arrival_airport": {
              "name": destinationAirport.name,
              "id": destinationAirport.code,
              "time": `${dateStr} ${formatTime(new Date(baseTime.getTime() + 150 * 60000))}`
            },
            "duration": 150,
            "airplane": "Airbus A330",
            "airline": selectedAirlines[0],
            "airline_logo": `https://www.gstatic.com/flights/airline_logos/70px/${selectedAirlineCodes[0]}.png`,
            "travel_class": "Economy",
            "flight_number": `${selectedAirlineCodes[0]} ${getRandomFlightNumber()}`,
            "legroom": "32 in",
            "extensions": [
              "Above average legroom (32 in)",
              "In-seat USB outlet",
              "On-demand video",
              `Carbon emissions estimate: ${Math.floor(Math.random() * 200 + 100)} kg`
            ]
          }
        ],
        "layovers": [],
        "total_duration": 150,
        "carbon_emissions": {
          "this_flight": 118000,
          "typical_for_this_route": 118000,
          "difference_percent": 0
        },
        "price": Math.floor(Math.random() * 300 + 200),
        "type": "One way",
        "airline_logo": `https://www.gstatic.com/flights/airline_logos/70px/${selectedAirlineCodes[0]}.png`,
        "booking_token": `token-${Math.random().toString(36).substring(2, 15)}`
      },
      {
        "flights": [
          {
            "departure_airport": {
              "name": sourceAirport.name,
              "id": sourceAirport.code,
              "time": `${dateStr} ${formatTime(new Date(baseTime.getTime() + 120 * 60000))}`
            },
            "arrival_airport": {
              "name": getRandomConnectionAirport().name,
              "id": getRandomConnectionAirport().code,
              "time": `${dateStr} ${formatTime(new Date(baseTime.getTime() + 240 * 60000))}`
            },
            "duration": 120,
            "airplane": "Boeing 737",
            "airline": selectedAirlines[1],
            "airline_logo": `https://www.gstatic.com/flights/airline_logos/70px/${selectedAirlineCodes[1]}.png`,
            "travel_class": "Economy",
            "flight_number": `${selectedAirlineCodes[1]} ${getRandomFlightNumber()}`,
            "legroom": "31 in",
            "extensions": [
              "Average legroom (31 in)",
              "Wi-Fi for a fee",
              "In-seat power & USB outlets",
              `Carbon emissions estimate: ${Math.floor(Math.random() * 200 + 100)} kg`
            ]
          },
          {
            "departure_airport": {
              "name": getRandomConnectionAirport().name,
              "id": getRandomConnectionAirport().code,
              "time": `${dateStr} ${formatTime(new Date(baseTime.getTime() + 300 * 60000))}`
            },
            "arrival_airport": {
              "name": destinationAirport.name,
              "id": destinationAirport.code,
              "time": `${dateStr} ${formatTime(new Date(baseTime.getTime() + 420 * 60000))}`
            },
            "duration": 120,
            "airplane": "Airbus A320",
            "airline": selectedAirlines[1],
            "airline_logo": `https://www.gstatic.com/flights/airline_logos/70px/${selectedAirlineCodes[1]}.png`,
            "travel_class": "Economy",
            "flight_number": `${selectedAirlineCodes[1]} ${getRandomFlightNumber()}`,
            "legroom": "30 in",
            "extensions": [
              "Average legroom (30 in)",
              "Wi-Fi for a fee",
              "In-seat power & USB outlets",
              `Carbon emissions estimate: ${Math.floor(Math.random() * 200 + 100)} kg`
            ]
          }
        ],
        "layovers": [
          {
            "duration": 60,
            "name": getRandomConnectionAirport().name,
            "id": getRandomConnectionAirport().code
          }
        ],
        "total_duration": 300,
        "carbon_emissions": {
          "this_flight": 246000,
          "typical_for_this_route": 245000,
          "difference_percent": 0
        },
        "price": Math.floor(Math.random() * 400 + 300),
        "type": "One way",
        "airline_logo": `https://www.gstatic.com/flights/airline_logos/70px/${selectedAirlineCodes[1]}.png`,
        "booking_token": `token-${Math.random().toString(36).substring(2, 15)}`
      },
      {
        "flights": [
          {
            "departure_airport": {
              "name": sourceAirport.name,
              "id": sourceAirport.code,
              "time": `${dateStr} ${formatTime(new Date(baseTime.getTime() + 60 * 60000))}`
            },
            "arrival_airport": {
              "name": destinationAirport.name,
              "id": destinationAirport.code,
              "time": `${dateStr} ${formatTime(new Date(baseTime.getTime() + 280 * 60000))}`
            },
            "duration": 220,
            "airplane": "Boeing 777",
            "airline": selectedAirlines[2],
            "airline_logo": `https://www.gstatic.com/flights/airline_logos/70px/${selectedAirlineCodes[2]}.png`,
            "travel_class": "Economy",
            "flight_number": `${selectedAirlineCodes[2]} ${getRandomFlightNumber()}`,
            "legroom": "34 in",
            "extensions": [
              "Above average legroom (34 in)",
              "Wi-Fi included",
              "In-seat power & USB outlets",
              "On-demand video",
              `Carbon emissions estimate: ${Math.floor(Math.random() * 200 + 150)} kg`
            ]
          }
        ],
        "layovers": [],
        "total_duration": 220,
        "carbon_emissions": {
          "this_flight": 180000,
          "typical_for_this_route": 150000,
          "difference_percent": 20
        },
        "price": Math.floor(Math.random() * 600 + 400),
        "type": "One way",
        "airline_logo": `https://www.gstatic.com/flights/airline_logos/70px/${selectedAirlineCodes[2]}.png`,
        "booking_token": `token-${Math.random().toString(36).substring(2, 15)}`
      }
    ]
  };
};

// Helper function to select diverse airlines
const selectDiverseAirlines = (count: number): string[] => {
  // Shuffle the airlines array to get random airlines
  const shuffled = [...airlines].sort(() => 0.5 - Math.random());
  // Take the first 'count' airlines
  return shuffled.slice(0, count);
};

// Helper functions to generate mock flight data
const getSourceAirport = (source: string) => {
  // Map city names to airport info
  const airports: Record<string, {name: string, code: string}> = {
    "New York": { name: "John F. Kennedy International Airport", code: "JFK" },
    "Los Angeles": { name: "Los Angeles International Airport", code: "LAX" },
    "Chicago": { name: "O'Hare International Airport", code: "ORD" },
    "San Francisco": { name: "San Francisco International Airport", code: "SFO" },
    "Miami": { name: "Miami International Airport", code: "MIA" },
    "Dallas": { name: "Dallas/Fort Worth International Airport", code: "DFW" },
    "London": { name: "Heathrow Airport", code: "LHR" },
    "Paris": { name: "Charles de Gaulle Airport", code: "CDG" },
    "Tokyo": { name: "Narita International Airport", code: "NRT" },
    "Sydney": { name: "Sydney Airport", code: "SYD" },
  };
  
  // Find closest match or return default
  const match = Object.keys(airports).find(city => 
    source.toLowerCase().includes(city.toLowerCase())
  );
  
  return match ? airports[match] : { name: `${source} Airport`, code: source.slice(0, 3).toUpperCase() };
};

const getDestinationAirport = (destination: string) => {
  // Map city names to airport info
  const airports: Record<string, {name: string, code: string}> = {
    "New York": { name: "John F. Kennedy International Airport", code: "JFK" },
    "Los Angeles": { name: "Los Angeles International Airport", code: "LAX" },
    "Chicago": { name: "O'Hare International Airport", code: "ORD" },
    "San Francisco": { name: "San Francisco International Airport", code: "SFO" },
    "Miami": { name: "Miami International Airport", code: "MIA" },
    "Dallas": { name: "Dallas/Fort Worth International Airport", code: "DFW" },
    "London": { name: "Heathrow Airport", code: "LHR" },
    "Paris": { name: "Charles de Gaulle Airport", code: "CDG" },
    "Tokyo": { name: "Narita International Airport", code: "NRT" },
    "Sydney": { name: "Sydney Airport", code: "SYD" },
    "Las Vegas": { name: "Harry Reid International Airport", code: "LAS" },
    "Orlando": { name: "Orlando International Airport", code: "MCO" },
    "Hawaii": { name: "Daniel K. Inouye International Airport", code: "HNL" },
    "Rome": { name: "Leonardo da Vinci International Airport", code: "FCO" },
    "Barcelona": { name: "Barcelona-El Prat Airport", code: "BCN" },
    "Amsterdam": { name: "Amsterdam Airport Schiphol", code: "AMS" },
    "Dubai": { name: "Dubai International Airport", code: "DXB" },
    "Bangkok": { name: "Suvarnabhumi Airport", code: "BKK" },
    "Singapore": { name: "Singapore Changi Airport", code: "SIN" },
    "Hong Kong": { name: "Hong Kong International Airport", code: "HKG" },
  };
  
  // Find closest match or return default
  const match = Object.keys(airports).find(city => 
    destination.toLowerCase().includes(city.toLowerCase())
  );
  
  return match ? airports[match] : { name: `${destination} Airport`, code: destination.slice(0, 3).toUpperCase() };
};

const connectionAirports = [
  { name: "Hartsfield-Jackson Atlanta International Airport", code: "ATL" },
  { name: "Denver International Airport", code: "DEN" },
  { name: "Frankfurt Airport", code: "FRA" },
  { name: "Beijing Capital International Airport", code: "PEK" },
  { name: "Toronto Pearson International Airport", code: "YYZ" },
  { name: "Istanbul Airport", code: "IST" },
  { name: "Charlotte Douglas International Airport", code: "CLT" },
  { name: "Seattle-Tacoma International Airport", code: "SEA" },
  { name: "Munich Airport", code: "MUC" },
  { name: "Phoenix Sky Harbor International Airport", code: "PHX" },
];

const getRandomConnectionAirport = () => {
  return connectionAirports[Math.floor(Math.random() * connectionAirports.length)];
};

// Update airlines array to include more major airlines
const airlines = [
  "American Airlines",
  "Delta Air Lines",
  "United Airlines",
  "Southwest Airlines",
  "Air France",
  "British Airways",
  "Lufthansa",
  "Emirates",
  "Singapore Airlines",
  "Qatar Airways",
  "JetBlue",
  "Alaska Airlines",
  "Air Canada",
  "Turkish Airlines",
  "KLM Royal Dutch Airlines",
  "Japan Airlines"
];

// Update airline codes to match the airlines in the array
const airlineCodes = [
  "AA", "DL", "UA", "WN", "AF", 
  "BA", "LH", "EK", "SQ", "QR",
  "B6", "AS", "AC", "TK", "KL", 
  "JL"
];

const getRandomAirline = () => {
  return airlines[Math.floor(Math.random() * airlines.length)];
};

const getRandomAirlineCode = () => {
  return airlineCodes[Math.floor(Math.random() * airlineCodes.length)];
};

const getRandomFlightNumber = () => {
  return Math.floor(Math.random() * 9000 + 1000).toString();
};

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Interface for flight data
export interface Airport {
  name: string;
  id: string;
  time: string;
}

export interface Flight {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  ticket_also_sold_by?: string[];
  legroom: string;
  extensions: string[];
  overnight?: boolean;
  plane_and_crew_by?: string;
}

export interface Layover {
  duration: number;
  name: string;
  id: string;
}

export interface CarbonEmissions {
  this_flight: number;
  typical_for_this_route: number;
  difference_percent: number;
}

export interface FlightOption {
  flights: Flight[];
  layovers: Layover[];
  total_duration: number;
  carbon_emissions: CarbonEmissions;
  price: number;
  type: string;
  airline_logo: string;
  booking_token: string;
}

export interface FlightData {
  best_flights: FlightOption[];
}

// Function to fetch flight data (mock implementation)
export const fetchFlightData = async (source: string, destination: string, date: Date): Promise<FlightData> => {
  console.log(`Fetching flight data from ${source} to ${destination} on ${date.toISOString().split('T')[0]}`);
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return generateMockFlightData(source, destination, date);
};

// Function to book a flight (mock implementation)
export const bookFlight = async (bookingToken: string): Promise<{ success: boolean; confirmationCode?: string; message?: string }> => {
  console.log(`Booking flight with token: ${bookingToken}`);
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const isSuccess = Math.random() < 0.9;
  
  if (isSuccess) {
    const confirmationCode = `BK${Math.floor(Math.random() * 10000).toString().padStart(6, '0')}`;
    return {
      success: true,
      confirmationCode,
      message: `Your flight has been successfully booked! Confirmation code: ${confirmationCode}`
    };
  } else {
    return {
      success: false,
      message: "Unable to book the flight at this time. Please try again later."
    };
  }
};

// Helper function to format duration in hours and minutes
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Helper function to format date and time
export const formatDateTime = (dateTimeStr: string): { date: string, time: string } => {
  const dateTime = new Date(dateTimeStr);
  const date = dateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return { date, time };
};
