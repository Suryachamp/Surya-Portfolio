import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  // Add CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages, systemPrompt } = req.body;

  // Basic validation
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  // Only allow 'user' and 'assistant' roles, map 'assistant' to 'model', cap history at 20 messages
  const formattedMessages = messages
    .filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .slice(-20)
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, 2000) }]
    }));

  // CRITICAL FIX: Gemini API requires the conversation history to start with a 'user' message.
  // We need to remove any leading 'model' messages before sending to Gemini.
  while (formattedMessages.length > 0 && formattedMessages[0].role === 'model') {
    formattedMessages.shift();
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: formattedMessages,
      config: {
        systemInstruction: systemPrompt || 'You are a helpful assistant.',
        maxOutputTokens: 400,
      }
    });

    const reply = response.text || "Sorry, I couldn't generate a response.";
    res.status(200).json({ reply });

  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
}
