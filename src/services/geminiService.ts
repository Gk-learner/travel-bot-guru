
// Utility service for Gemini AI API interactions

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

interface TripGenerationParams {
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: number;
  source: string;
  destination: string;
}

export const generateTripsWithGemini = async (
  apiKey: string | null,
  params: TripGenerationParams
): Promise<any> => {
  if (!apiKey) {
    throw new Error("API key is required");
  }

  const durationInDays = Math.ceil(
    (params.endDate.getTime() - params.startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const formattedStartDate = params.startDate.toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });
  
  const formattedEndDate = params.endDate.toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });

  const prompt = `
    Generate 4 travel itinerary options for a trip with the following details:
    - From: ${params.source}
    - To: ${params.destination}
    - Start Date: ${formattedStartDate}
    - End Date: ${formattedEndDate} (${durationInDays} days)
    - Number of Travelers: ${params.travelers}
    - Budget: $${params.budget.toLocaleString()}

    For each itinerary option, provide:
    1. Title (catchy name for the trip)
    2. Brief description
    3. Price (should vary, with some under budget and some over budget)
    4. Four highlights of the trip
    
    Format your response as valid JSON with this structure:
    [
      {
        "id": "trip-1",
        "title": "Title",
        "description": "Description",
        "price": number,
        "duration": ${durationInDays},
        "highlights": ["highlight1", "highlight2", "highlight3", "highlight4"]
      },
      ... (3 more options)
    ]
    
    Do not include any additional explanations, only return the JSON.
  `;

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Error calling Gemini API');
    }

    const data: GeminiResponse = await response.json();
    
    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini API');
    }
    
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response (in case there's any extra text)
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Gemini response');
    }
    
    try {
      const jsonData = JSON.parse(jsonMatch[0]);
      
      // Add image URLs to each trip
      const mockImages = [
        "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2940&auto=format&fit=crop",
      ];
      
      const tripsWithImages = jsonData.map((trip: any, index: number) => ({
        ...trip,
        image: mockImages[index % mockImages.length]
      }));
      
      return tripsWithImages;
    } catch (e) {
      console.error('JSON parse error:', e);
      throw new Error('Failed to parse Gemini response');
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
};
