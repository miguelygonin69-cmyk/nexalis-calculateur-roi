import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // La clé est stockée dans les variables d'environnement Vercel
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { prompt, temperature } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: prompt,
      config: {
        temperature: temperature || 0.7,
      }
    });

    return res.status(200).json({ 
      text: response.text || '',
      content: response.text || ''
    });
    
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ 
      error: 'Failed to generate content',
      details: error.message
    });
  }
}
```

---

### **Structure du projet :**
```
votre-projet/
├── api/
│   └── gemini.js          ← NOUVEAU FICHIER
├── src/
├── package.json
└── ...