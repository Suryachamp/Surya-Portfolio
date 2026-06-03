import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Load environment variables from .env file
dotenv.config();

// Get API key from command line argument OR from .env
const apiKey = process.argv[2] || process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  console.error('❌ Error: No API key provided.');
  console.log('👉 Usage: node test-gemini.js YOUR_API_KEY_HERE');
  console.log('   Or set GEMINI_API_KEY in your .env file.');
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

async function testGemini() {
  console.log('🤖 Testing Gemini API connection...');
  console.log('Model: gemini-2.5-flash-lite');
  console.log('Prompt: "Say hello world!"\n');
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: 'Say hello world!',
    });
    
    console.log('✅ Success! Gemini responded with:');
    console.log('-----------------------------------');
    console.log(response.text);
    console.log('-----------------------------------');
  } catch (error) {
    console.error('❌ Error connecting to Gemini API:');
    console.error(error.message);
  }
}

testGemini();
