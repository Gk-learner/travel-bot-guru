
// Mock response for SERP API flight data
const mockFlightResponse = {
  "best_flights": [
    {
      "flights": [
        {
          "departure_airport": {
            "name": "Guangzhou Baiyun International Airport",
            "id": "CAN",
            "time": "2025-04-20 10:30"
          },
          "arrival_airport": {
            "name": "Shanghai Pudong International Airport",
            "id": "PVG",
            "time": "2025-04-20 13:00"
          },
          "duration": 150,
          "airplane": "Airbus A330",
          "airline": "China Southern",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/CZ.png",
          "travel_class": "Economy",
          "flight_number": "CZ 3550",
          "ticket_also_sold_by": [
            "American"
          ],
          "legroom": "32 in",
          "extensions": [
            "Above average legroom (32 in)",
            "In-seat USB outlet",
            "On-demand video",
            "Carbon emissions estimate: 118 kg"
          ]
        },
        {
          "departure_airport": {
            "name": "Shanghai Pudong International Airport",
            "id": "PVG",
            "time": "2025-04-20 17:00"
          },
          "arrival_airport": {
            "name": "Dallas Fort Worth International Airport",
            "id": "DFW",
            "time": "2025-04-20 17:05"
          },
          "duration": 785,
          "airplane": "Boeing 787",
          "airline": "American",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/AA.png",
          "travel_class": "Economy",
          "flight_number": "AA 128",
          "legroom": "31 in",
          "extensions": [
            "Average legroom (31 in)",
            "Wi-Fi for a fee",
            "In-seat power & USB outlets",
            "On-demand video",
            "Carbon emissions estimate: 715 kg"
          ],
          "overnight": true
        },
        {
          "departure_airport": {
            "name": "Dallas Fort Worth International Airport",
            "id": "DFW",
            "time": "2025-04-20 20:49"
          },
          "arrival_airport": {
            "name": "Indianapolis International Airport",
            "id": "IND",
            "time": "2025-04-20 23:58"
          },
          "duration": 129,
          "airplane": "Boeing 737",
          "airline": "American",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/AA.png",
          "travel_class": "Economy",
          "flight_number": "AA 766",
          "legroom": "30 in",
          "extensions": [
            "Average legroom (30 in)",
            "Wi-Fi for a fee",
            "In-seat power & USB outlets",
            "Stream media to your device",
            "Carbon emissions estimate: 112 kg"
          ]
        }
      ],
      "layovers": [
        {
          "duration": 240,
          "name": "Shanghai Pudong International Airport",
          "id": "PVG"
        },
        {
          "duration": 224,
          "name": "Dallas Fort Worth International Airport",
          "id": "DFW"
        }
      ],
      "total_duration": 1528,
      "carbon_emissions": {
        "this_flight": 946000,
        "typical_for_this_route": 945000,
        "difference_percent": 0
      },
      "price": 1206,
      "type": "One way",
      "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
      "booking_token": "WyJDalJJUlRReWJHUkNNbHA1YVdOQlFVMTJOVUZDUnkwdExTMHRMUzB0YjNsaVltc3hNVUZCUVVGQlIyWmlUemMwVGpORFkyMUJFaEpEV2pNMU5UQjhRVUV4TWpoOFFVRTNOallhQ3dqNXJRY1FBaG9EVlZORU9CeHcrYTBIIixbWyJDQU4iLCIyMDI1LTA0LTIwIiwiUFZHIixudWxsLCJDWiIsIjM1NTAiXSxbIlBWRyIsIjIwMjUtMDQtMjAiLCJERlciLG51bGwsIkFBIiwiMTI4Il0sWyJERlciLCIyMDI1LTA0LTIwIiwiSU5EIixudWxsLCJBQSIsIjc2NiJdXV0="
    },
    {
      "flights": [
        {
          "departure_airport": {
            "name": "Guangzhou Baiyun International Airport",
            "id": "CAN",
            "time": "2025-04-20 07:30"
          },
          "arrival_airport": {
            "name": "Shanghai Pudong International Airport",
            "id": "PVG",
            "time": "2025-04-20 09:35"
          },
          "duration": 125,
          "airplane": "Airbus A320neo",
          "airline": "China Eastern",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/MU.png",
          "travel_class": "Economy",
          "flight_number": "MU 5320",
          "legroom": "30 in",
          "extensions": [
            "Average legroom (30 in)",
            "In-seat power & USB outlets",
            "Carbon emissions estimate: 115 kg"
          ]
        },
        {
          "departure_airport": {
            "name": "Shanghai Pudong International Airport",
            "id": "PVG",
            "time": "2025-04-20 11:30"
          },
          "arrival_airport": {
            "name": "John F. Kennedy International Airport",
            "id": "JFK",
            "time": "2025-04-20 14:25"
          },
          "duration": 895,
          "airplane": "Boeing 777",
          "airline": "China Eastern",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/MU.png",
          "travel_class": "Economy",
          "flight_number": "MU 587",
          "legroom": "32 in",
          "extensions": [
            "Above average legroom (32 in)",
            "Wi-Fi for a fee",
            "In-seat power & USB outlets",
            "On-demand video",
            "Carbon emissions estimate: 869 kg"
          ],
          "overnight": true
        },
        {
          "departure_airport": {
            "name": "John F. Kennedy International Airport",
            "id": "JFK",
            "time": "2025-04-20 18:20"
          },
          "arrival_airport": {
            "name": "Indianapolis International Airport",
            "id": "IND",
            "time": "2025-04-20 20:56"
          },
          "duration": 156,
          "airplane": "Canadair RJ 900",
          "airline": "Delta",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/DL.png",
          "travel_class": "Economy",
          "flight_number": "DL 4914",
          "ticket_also_sold_by": [
            "China Eastern"
          ],
          "legroom": "31 in",
          "extensions": [
            "Average legroom (31 in)",
            "Wi-Fi for a fee",
            "Carbon emissions estimate: 144 kg"
          ],
          "plane_and_crew_by": "Endeavor Air"
        }
      ],
      "layovers": [
        {
          "duration": 115,
          "name": "Shanghai Pudong International Airport",
          "id": "PVG"
        },
        {
          "duration": 235,
          "name": "John F. Kennedy International Airport",
          "id": "JFK"
        }
      ],
      "total_duration": 1526,
      "carbon_emissions": {
        "this_flight": 1130000,
        "typical_for_this_route": 945000,
        "difference_percent": 20
      },
      "price": 1322,
      "type": "One way",
      "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
      "booking_token": "WyJDalJJUlRReWJHUkNNbHA1YVdOQlFVMTJOVUZDUnkwdExTMHRMUzB0YjNsaVltc3hNVUZCUVVGQlIyWmlUemMwVGpORFkyMUJFaE5OVlRVek1qQjhUVlUxT0RkOFJFdzBPVEUwR2dzSXNJZ0lFQUlhQTFWVFJEZ2NjTENJQ0E9PSIsW1siQ0FOIiwiMjAyNS0wNC0yMCIsIlBWRyIsbnVsbCwiTVUiLCI1MzIwIl0sWyJQVkciLCIyMDI1LTA0LTIwIiwiSkZLIixudWxsLCJNVSIsIjU4NyJdLFsiSkZLIiwiMjAyNS0wNC0yMCIsIklORCIsbnVsbCwiREwiLCI0OTE0Il1dXQ=="
    },
    {
      "flights": [
        {
          "departure_airport": {
            "name": "Guangzhou Baiyun International Airport",
            "id": "CAN",
            "time": "2025-04-20 10:30"
          },
          "arrival_airport": {
            "name": "Shanghai Pudong International Airport",
            "id": "PVG",
            "time": "2025-04-20 13:00"
          },
          "duration": 150,
          "airplane": "Airbus A330",
          "airline": "China Southern",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/CZ.png",
          "travel_class": "Economy",
          "flight_number": "CZ 3550",
          "ticket_also_sold_by": [
            "American"
          ],
          "legroom": "32 in",
          "extensions": [
            "Above average legroom (32 in)",
            "In-seat USB outlet",
            "On-demand video",
            "Carbon emissions estimate: 118 kg"
          ]
        },
        {
          "departure_airport": {
            "name": "Shanghai Pudong International Airport",
            "id": "PVG",
            "time": "2025-04-20 17:00"
          },
          "arrival_airport": {
            "name": "Dallas Fort Worth International Airport",
            "id": "DFW",
            "time": "2025-04-20 17:05"
          },
          "duration": 785,
          "airplane": "Boeing 787",
          "airline": "American",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/AA.png",
          "travel_class": "Economy",
          "flight_number": "AA 128",
          "legroom": "31 in",
          "extensions": [
            "Average legroom (31 in)",
            "Wi-Fi for a fee",
            "In-seat power & USB outlets",
            "On-demand video",
            "Carbon emissions estimate: 715 kg"
          ],
          "overnight": true
        },
        {
          "departure_airport": {
            "name": "Dallas Fort Worth International Airport",
            "id": "DFW",
            "time": "2025-04-20 19:25"
          },
          "arrival_airport": {
            "name": "Indianapolis International Airport",
            "id": "IND",
            "time": "2025-04-20 22:34"
          },
          "duration": 129,
          "airplane": "Boeing 737",
          "airline": "American",
          "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/AA.png",
          "travel_class": "Economy",
          "flight_number": "AA 2800",
          "legroom": "30 in",
          "extensions": [
            "Average legroom (30 in)",
            "Wi-Fi for a fee",
            "In-seat power & USB outlets",
            "Stream media to your device",
            "Carbon emissions estimate: 112 kg"
          ]
        }
      ],
      "layovers": [
        {
          "duration": 240,
          "name": "Shanghai Pudong International Airport",
          "id": "PVG"
        },
        {
          "duration": 140,
          "name": "Dallas Fort Worth International Airport",
          "id": "DFW"
        }
      ],
      "total_duration": 1444,
      "carbon_emissions": {
        "this_flight": 946000,
        "typical_for_this_route": 945000,
        "difference_percent": 0
      },
      "price": 1387,
      "type": "One way",
      "airline_logo": "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
      "booking_token": "WyJDalJJUlRReWJHUkNNbHA1YVdOQlFVMTJOVUZDUnkwdExTMHRMUzB0YjNsaVltc3hNVUZCUVVGQlIyWmlUemMwVGpORFkyMUJFaE5EV2pNMU5UQjhRVUV4TWpoOFFVRXlPREF3R2dzSXZyc0lFQUlhQTFWVFJEZ2NjTDY3Q0E9PSIsW1siQ0FOIiwiMjAyNS0wNC0yMCIsIlBWRyIsbnVsbCwiQ1oiLCIzNTUwIl0sWyJQVkciLCIyMDI1LTA0LTIwIiwiREZXIixudWxsLCJBQSIsIjEyOCJdLFsiREZXIiwiMjAyNS0wNC0yMCIsIklORCIsbnVsbCwiQUEiLCIyODAwIl1dXQ=="
    }
  ]
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
  // In a real implementation, this would call the SERP API with the provided parameters
  console.log(`Fetching flight data from ${source} to ${destination} on ${date.toISOString().split('T')[0]}`);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock data
  return mockFlightResponse;
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
