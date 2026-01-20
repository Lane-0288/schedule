import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is not defined in the environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'DUMMY_KEY_FOR_BUILD' });

export const sendGraduationQuery = async (
  prompt: string,
  base64Image?: string
): Promise<string> => {
  try {
    const parts: any[] = [];

    if (base64Image) {
      // Remove data URL prefix if present to get just the base64 string
      const base64Data = base64Image.split(',')[1] || base64Image;
      
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg', // Assuming jpeg/png, API detects mostly
          data: base64Data,
        },
      });
    }

    parts.push({ text: prompt });

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: parts },
      config: {
        systemInstruction: "You are an encouraging and knowledgeable high school guidance counselor. Your goal is to help students understand their graduation requirements. When a student uploads an image of their credit breakdown or transcript, analyze it carefully to identify missing credits, required subjects, and offer strategic advice on what classes to take next. Be concise but warm.",
      }
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error while analyzing your request. Please ensure you have a valid API key and internet connection.";
  }
};
