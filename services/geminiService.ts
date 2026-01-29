import { GoogleGenAI } from "@google/genai";
import { CalculatorInputs, CalculationResult } from "../types";

export const generateStrategicInsight = async (
  inputs: CalculatorInputs,
  results: CalculationResult
): Promise<string | null> => {
  try {
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("API Key is missing");
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      Agis comme un Directeur Stratégie Senior chez McKinsey.
      
      CONTEXTE CLIENT :
      - Secteur : ${inputs.industry}
      - Effectif : ${inputs.employees} personnes
      - Gain potentiel identifié : ${results.annualSavings.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} / an
      - Heures récupérables : ${results.totalHoursSaved} h / an
      
      TACHE :
      Rédige une analyse stratégique courte et percutante (max 300 mots) pour convaincre le dirigeant.
      Structure :
      1. L'opportunité stratégique (1 phrase choc)
      2. 3 Actions concrètes à mettre en place immédiatement
      3. Une projection sur l'avantage concurrentiel à 3 ans.
      
      Ton doit être professionnel, encourageant et expert. Utilise une mise en forme claire.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });

    return response.text || null;
    
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return null;
  }
};