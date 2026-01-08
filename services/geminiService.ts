
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export async function generateVehicleDescription(brand: string, model: string, year: number): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva uma descrição curta, elegante e persuasiva para um anúncio de venda de um ${brand} ${model} ano ${year}. Foque em exclusividade, performance e sofisticação. Máximo 2 parágrafos.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Descrição premium indisponível no momento.";
  } catch (error) {
    console.error("Error generating description:", error);
    return "Um veículo excepcional que une luxo e performance.";
  }
}
