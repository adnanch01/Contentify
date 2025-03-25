
import { OutputSettings } from "@/types/content";

// Using the provided API key
const API_KEY = "AIzaSyCSi6YTYwcVxMdz1FbFRpJgDqivpRvAGXw";
// Updated API URL to use the correct endpoint and model name
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export interface GeminiResponse {
  text: string;
  error?: string;
}

export async function generateContent(
  prompt: string,
  settings: OutputSettings
): Promise<GeminiResponse> {
  try {
    // Format the prompt to include the settings more explicitly
    const enhancedPrompt = `
Write a ${settings.contentType} in a ${settings.tone} tone with approximately ${settings.wordCount} words about the following topic:

${prompt}
    `;

    console.log("Sending request to Gemini API with prompt:", enhancedPrompt);

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: enhancedPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();

    // Check for API response format and extract text
    if (
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0]
    ) {
      return { text: data.candidates[0].content.parts[0].text };
    } else if (data.error) {
      console.error("Gemini API error:", data.error);
      return { text: "", error: data.error.message || "Unknown error occurred" };
    } else {
      return { text: "", error: "Unexpected API response format" };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      text: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
