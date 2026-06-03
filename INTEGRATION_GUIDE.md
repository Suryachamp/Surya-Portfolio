# 🤖 AI Chat — Integration Guide
## Files delivered: AiChat.jsx · server.js · vite.config.js

---

## Step 1 — Install dependencies

```bash
# In your project root
npm install @anthropic-ai/sdk express cors dotenv
```

---

## Step 2 — Get your Anthropic API key

1. Go to https://console.anthropic.com/
2. Create an account (free credits included)
3. Go to **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`)

Create a `.env` file in your project root:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
FRONTEND_URL=http://localhost:5173
```

Add `.env` to your `.gitignore` — NEVER push your API key to GitHub!

---

## Step 3 — Add the files

```
your-project/
├── src/
│   └── components/
│       └── AiChat/
│           └── AiChat.jsx      ← paste AiChat.jsx here
├── server.js                   ← paste server.js here (project root)
├── vite.config.js              ← replace your existing vite.config.js
└── .env                        ← your API key (DO NOT COMMIT)
```

---

## Step 4 — Import AiChat in App.jsx

```jsx
// src/App.jsx
import AiChat from './components/AiChat/AiChat'

function App() {
  return (
    <>
      {/* your existing sections */}
      <Home />

      {/* Add this — it renders as a fixed floating button */}
      <AiChat />
    </>
  )
}
```

---

## Step 5 — Run both servers

Open **two terminals**:

```bash
# Terminal 1 — Express backend
node server.js
# → Running on http://localhost:5000

# Terminal 2 — Vite frontend
npm run dev
# → Running on http://localhost:5173
```

Open http://localhost:5173 — you'll see the chat button in the bottom-right corner!

---

## Step 6 — Update your portfolio info in AiChat.jsx

Find the `PORTFOLIO_CONTEXT` constant at the top of `AiChat.jsx` and update it with any new:
- Projects you add
- Skills you learn
- Job experience

This is what the AI uses to answer questions about you.

---

## 🚀 Deploying to Production

### Frontend → Vercel (already there)
No changes needed — just redeploy after adding the files.
Update the fetch URL in AiChat.jsx:
```js
const res = await fetch('https://your-backend.onrender.com/api/chat', { ... })
```

### Backend → Render (free tier)
1. Push `server.js` to GitHub
2. Go to https://render.com → New Web Service
3. Connect your repo
4. Set environment variables:
   - `ANTHROPIC_API_KEY` = your key
   - `FRONTEND_URL` = your Vercel URL
5. Start command: `node server.js`

---

## 💰 Cost Estimate

Claude Haiku is extremely cheap:
- Input: $0.80 per million tokens
- Output: $0.20 per million tokens
- ~500 chat messages ≈ **$0.05** (5 cents)

With the rate limiter (20 req/min/IP), you're well protected.

---

## 🛠 Troubleshooting

| Problem | Fix |
|---|---|
| `CORS error` | Make sure both servers are running; check `allowedOrigins` in server.js |
| `401 Unauthorized` | Check your API key in `.env` |
| Chat button not visible | Make sure `<AiChat />` is inside `<App />` and not inside a `relative` container |
| Fetch fails in dev | Make sure `vite.config.js` proxy points to port 5000 |
