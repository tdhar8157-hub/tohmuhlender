
import { GoogleGenAI, Type } from "@google/genai";
import { LandingPageContent } from "../types";

export const generateCampaignContent = async (baseHeadline: string): Promise<Partial<LandingPageContent> | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert Facebook Ads direct response copywriter. 
      Based on the core message: "${baseHeadline}", generate highly converting landing page copy.
      Focus on psychology, scarcity, and clear value propositions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING, description: "A catchy, urgent headline." },
            subheadline: { type: Type.STRING, description: "A supportive subheadline explaining the benefit." },
            buttonText: { type: Type.STRING, description: "Action-oriented CTA button text." },
            benefits: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3 compelling benefit bullet points."
            },
            socialProof: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  quote: { type: Type.STRING },
                  author: { type: Type.STRING }
                },
                required: ["quote", "author"]
              }
            }
          },
          required: ["headline", "subheadline", "buttonText", "benefits", "socialProof"],
          propertyOrdering: ["headline", "subheadline", "buttonText", "benefits", "socialProof"]
        }
      }
    });

    const data = JSON.parse(response.text.trim());
    return data;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
