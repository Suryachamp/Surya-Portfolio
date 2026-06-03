// server.js  —  Place this in your project ROOT (same level as package.json)
// This is a minimal Express server that proxies requests to the Anthropic API.
// Your API key stays on the server — never exposed to the browser.
//
// Setup:
//   npm install express cors dotenv @anthropic-ai/sdk
//   Create a .env file:  ANTHROPIC_API_KEY=sk-ant-...
//   Run:  node server.js   (or: nodemon server.js)
//
// In production (Render / Railway / VPS):
//   Set ANTHROPIC_API_KEY as an environment variable in your host dashboard.
//   Set FRONTEND_URL to your deployed Vercel URL (for CORS).

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

// ─── CORS ──────────────────────────────────────────────────────────────────
// In development: allow localhost:5173 (Vite default)
// In production: allow your deployed frontend URL
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // e.g. https://surya-portfolio.vercel.app
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow if no origin (e.g. Postman), if explicitly allowed, or if it's a localhost port
    if (!origin || allowedOrigins.includes(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use(express.json())

// ─── Basic rate limiting (no extra package needed) ─────────────────────────
// Prevents someone from spamming your API key
const ipRequestCount = new Map()
const RATE_LIMIT = 20       // max requests per window
const RATE_WINDOW = 60_000  // 1 minute in ms

function rateLimit(req, res, next) {
  const ip = req.ip || req.socket.remoteAddress
  const now = Date.now()

  if (!ipRequestCount.has(ip)) {
    ipRequestCount.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return next()
  }

  const record = ipRequestCount.get(ip)

  if (now > record.resetAt) {
    record.count = 1
    record.resetAt = now + RATE_WINDOW
    return next()
  }

  if (record.count >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute.' })
  }

  record.count++
  next()
}

// ─── /api/chat  ────────────────────────────────────────────────────────────
app.post('/api/chat', rateLimit, async (req, res) => {
  const { messages, systemPrompt } = req.body

  // Basic validation
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' })
  }

  // Only allow 'user' and 'assistant' roles, cap history at 20 messages
  // For Gemini, map 'assistant' to 'model'
  const formattedMessages = messages
    .filter(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string')
    .slice(-20)               // keep last 20 to stay within context limits
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, 2000) }] // cap each message at 2000 chars
    }))

  // CRITICAL FIX: Gemini API requires the conversation history to start with a 'user' message.
  // The frontend sends an initial 'assistant' greeting, which causes a 400 Bad Request error.
  // We need to remove any leading 'model' messages before sending to Gemini.
  while (formattedMessages.length > 0 && formattedMessages[0].role === 'model') {
    formattedMessages.shift();
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',  // fast + cheap — great for chat widgets
      contents: formattedMessages,
      config: {
        systemInstruction: systemPrompt || 'You are a helpful assistant.',
        maxOutputTokens: 400,
      }
    })

    const reply = response.text || "Sorry, I couldn't generate a response."
    res.json({ reply })

  } catch (err) {
    console.error('Gemini API error:', err.message)
    res.status(500).json({ error: 'Failed to get response from AI.' })
  }
})

// ─── Health check ──────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`\n🤖 AI chat server running on http://localhost:${PORT}`)
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`)
})
