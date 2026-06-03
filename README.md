# 🤖 Surya's AI Portfolio

This is a modern, responsive web portfolio built with React and Tailwind CSS, featuring an integrated AI Chatbot powered by Google's Gemini 2.5 Flash-Lite.

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend/API:** Vercel Serverless Functions (`api/chat.js`)
- **AI Model:** Google Gemini 2.5 Flash-Lite (`@google/genai`)
- **Deployment:** Vercel

## 🛠 Local Development

### Step 1 — Install dependencies

```bash
# Install all required packages
npm install
```

### Step 2 — Get your Gemini API key

1. Go to Google AI Studio to get an API key.
2. Create a `.env` file in your project root:
```env
GEMINI_API_KEY=your-gemini-api-key-here
```
*(Note: `.env` is ignored by Git to keep your key secure.)*

### Step 3 — Run the development environment

Run both the Vite frontend and the proxy backend simultaneously:

```bash
npm run dev:full
```

Open `http://localhost:5173` to view the site. The chatbot will communicate with the local `server.js` proxy.

---

## 🌐 Deploying to Production (Vercel)

This project is fully configured for Vercel deployment.

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. **Important:** Go to your Vercel Project Settings > Environment Variables.
4. Add a new variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** Your actual Gemini API key
5. Deploy!

Vercel will automatically host the React frontend and deploy `api/chat.js` as a Serverless Function at the `/api/chat` endpoint.

---

## ⚙️ Updating AI Context

Find the `PORTFOLIO_CONTEXT` constant at the top of `src/components/AiChat/AiChat.jsx` and update it with any new:
- Projects you add
- Skills you learn
- Job experience

The Gemini AI uses this context to accurately answer questions about your professional background.
