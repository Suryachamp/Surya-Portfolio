// vite.config.js  —  Replace your existing vite.config.js with this
// 
// The `proxy` block makes /api/chat calls in development automatically
// forward to your Express server on port 5000.
// This means in dev, your React app calls /api/chat and Vite proxies it.
// In production (Vercel frontend + separate backend), update AiChat.jsx
// to use the full backend URL: https://your-backend.onrender.com/api/chat

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Any request to /api/* from the React dev server
      // gets forwarded to Express running on port 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
