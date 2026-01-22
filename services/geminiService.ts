import { GoogleGenAI } from "@google/genai";
import { CalculatorInputs, CalculationResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateStrategicInsight = async (
  inputs: CalculatorInputs,
  results: CalculationResult
): Promise<string> => {
  if (!apiKey) {
    return "Mode démo : Configurez l'API Key pour obtenir une analyse stratégique personnalisée.";
  }

  try {
    const prompt = `
      Agis comme un Directeur Stratégie Senior chez McKinsey ou BCG.
      
      CONTEXTE CLIENT :
      - Secteur : ${inputs.industry}
      - Effectif : ${inputs.employees} personnes
      - Gain potentiel identifié : ${results.annualSavings.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} / an
      - Heures "perdues" récupérables : ${results.totalHoursSaved} h / an
      
      OBJECTIF :
      Rédige un conseil stratégique (max 3 phrases) percutant et visionnaire.
      Ne dis pas "réinvestir dans la R&D" ou des banalités.
      Donne un exemple d'avantage compétitif précis que le secteur "${inputs.industry}" peut débloquer avec ce budget ou ce temps (ex: hyper-personnalisation client, réduction du time-to-market, nouveaux services).
      Ton ton doit être direct, professionnel, orienté ROI. Pas de jargon marketing vide.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 },
        temperature: 0.6,
      }
    });

    return response.text || "Analyse en cours...";
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "L'analyse IA n'est pas disponible pour le moment.";
  }
};