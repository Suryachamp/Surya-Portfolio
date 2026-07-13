// src/components/AiChat/AiChat.jsx
// Drop this file into your project and import it in App.jsx
// Requires: npm install marked   (for markdown rendering in bot replies)

import React, { useState, useRef, useEffect } from 'react'

// ─── Surya's portfolio data (the AI knows this) ──────────────────────────────
// This is sent as context to the backend on every request.
// Update this whenever your portfolio changes.
const PORTFOLIO_CONTEXT = `
You are an AI assistant embedded in Surya Sekhar Prajapati's developer portfolio.
Answer questions about Surya professionally, concisely, and in first-person where natural.
If asked something unrelated to Surya or web/tech topics, politely redirect.

== ABOUT SURYA ==
Full Name: Surya Sekhar Prajapati
Role: Full Stack Developer
Location: Jaipur, India
Email: surya2004sekhar@gmail.com
Phone: +91-79802-80372
Availability: Available for full-time roles and freelance projects
Summary: Full Stack Developer with production frontend experience and hands-on backend development across personal full-stack projects. Builds end-to-end applications using React, Next.js, Node.js.

== WORK EXPERIENCE ==
- Frontend Software Engineer, Jaipur (Sep 2025 – Present)
  * Engineered 30+ responsive pages and 15+ React/Next.js components with SSR and dynamic routing.
  * Diagnosed and resolved Google PageSpeed Insights failures (CLS, images) improving Core Web Vitals.
  * Containerized local dev environments with Docker.

== EDUCATION ==
- B.Tech in Computer Science – University of Engineering and Management, Jaipur (2022–2026), GPA: 8.50/10
- WBCHSE – Nava Nalanda School, Kolkata (2022), 86%

== TECH STACK ==
Frontend: React, Next.js, Redux Toolkit, Bootstrap, Tailwind CSS, jQuery, Shadcn/UI
Backend: Node.js, Express.js, REST API Design, JWT Authentication, Prisma ORM
Database: MongoDB, PostgreSQL, MySQL, SQL
AI/APIs: Cursor, Claude Code, Lovable, Google Gemini API
DevOps/Other: Docker, Git, GitHub, Postman, Vercel, Netlify, Render, Vite, Webpack

== PROJECTS ==
1. Subscription Manager (Jun 2026 – Present)
   - Production-ready subscription tracking REST API
   - Stack: Node.js, Express, PostgreSQL, Prisma ORM, JWT, Zod
   - Highlights: Layered architecture, user-scoped data access, complete auth flow.

2. CareerForge - AI Career & Resume Suite (May – Jun 2026)
   - Full-stack AI career platform with a React/Vite frontend and Node.js backend.
   - Stack: MERN Stack, JWT, Google Gemini API, Docker
   - Highlights: AI-guided resume editor with real-time compiler, tailored interview generation, Dockerized deployment.

3. Budget Box (Nov – Dec 2025)
   - Offline-first budgeting app with analytics dashboard
   - Stack: Next.js, Node.js, PostgreSQL, IndexedDB
   - URL: https://budgetboxfrontend.vercel.app/
   - Highlights: Works without network dependency, 6-module analytics dashboard.

4. Nagrik And Samvidhan (Aug – Nov 2024)
   - AI-assisted civic education app using Gemini API
   - Features: AI summarization, gamified learning modules
   - Stack: React, JavaScript, Gemini API

== SOCIAL LINKS ==
GitHub: https://github.com/Suryachamp
LinkedIn: linkedin.com/in/surya-sekhar-prajapati

== PERSONALITY / STYLE ==
Keep answers short (2–4 sentences max unless a list is needed).
Be warm and professional. Use bullet points for lists.
If someone asks "are you available?", say yes and encourage them to reach out via email.
`

// ─── Suggested starter questions ─────────────────────────────────────────────
const SUGGESTIONS = [
  "What's Surya's tech stack?",
  "Tell me about his projects",
  "Is he available for hire?",
  "What's his experience?",
]

// ─── Simple markdown → HTML (bold, inline code, bullet lists) ────────────────
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(0,229,176,0.12);padding:1px 5px;border-radius:3px;font-family:\'Fira Code\',monospace;font-size:0.85em">$1</code>')
    .replace(/^- (.+)$/gm, '<li style="margin-left:1em;list-style:disc">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="margin:6px 0">$&</ul>')
    .replace(/\n/g, '<br/>')
}

// ─── Individual message bubble ────────────────────────────────────────────────
function Message({ msg }) {
  const isBot = msg.role === 'assistant'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isBot ? 'flex-start' : 'flex-end',
      marginBottom: '12px',
      animation: 'msgSlideIn 0.25s ease both',
    }}>
      {isBot && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'rgba(0,229,176,0.15)',
          border: '1.5px solid rgba(0,229,176,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginRight: 8, flexShrink: 0, marginTop: 2,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5b0" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth: '78%',
        padding: '10px 14px',
        borderRadius: isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
        background: isBot ? '#1c2333' : 'rgba(0,229,176,0.14)',
        border: isBot ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,229,176,0.3)',
        fontSize: '13px',
        lineHeight: '1.65',
        color: isBot ? '#c9d1d9' : '#e6edf3',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
      />
    </div>
  )
}

// ─── Typing dots indicator ────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(0,229,176,0.15)',
        border: '1.5px solid rgba(0,229,176,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#00e5b0" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      </div>
      <div style={{
        padding: '10px 16px',
        background: '#1c2333',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '4px 14px 14px 14px',
        display: 'flex', gap: 4, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: '50%', background: '#00e5b0',
            animation: `typingDot 1.2s ease infinite`,
            animationDelay: `${i * 0.2}s`,
            display: 'inline-block',
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── Main AiChat component ────────────────────────────────────────────────────
export default function AiChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! 👋 I'm Surya's AI assistant. Ask me anything about his skills, projects, or availability.",
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pulse, setPulse] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Stop pulsing after 8s
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 8000)
    return () => clearTimeout(t)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150)
  }, [open])

  const sendMessage = async (text) => {
    const content = text || input.trim()
    if (!content || loading) return

    const userMsg = { role: 'user', content }
    const updatedMessages = [...messages, userMsg]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      // ── Calls your Express backend (see server.js) ──
      // Change this URL to your deployed backend URL in production
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          systemPrompt: PORTFOLIO_CONTEXT,
        }),
      })

      if (!res.ok) throw new Error('Server error')

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError('Something went wrong. Try again!')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes msgSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes chatOpen {
          from { opacity: 0; transform: scale(0.9) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   box-shadow: 0 0 0 0   rgba(0,229,176,0.5); }
          70%  { transform: scale(1.05);box-shadow: 0 0 0 12px rgba(0,229,176,0); }
          100% { transform: scale(1);   box-shadow: 0 0 0 0   rgba(0,229,176,0); }
        }
        .ai-fab { animation: ${pulse ? 'pulseRing 2s ease infinite' : 'none'}; }
        .ai-fab:hover { transform: scale(1.08) !important; }
        .ai-input:focus { outline: none; }
        .ai-send:hover { background: rgba(0,229,176,0.25) !important; }
        .ai-chip:hover { background: rgba(0,229,176,0.18) !important; border-color: rgba(0,229,176,0.5) !important; color: #00e5b0 !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,176,0.2); border-radius: 2px; }
      `}</style>

      {/* ── Chat window ── */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 90, right: 24, zIndex: 9999,
          width: 360, maxWidth: 'calc(100vw - 32px)',
          background: '#161b22',
          border: '1px solid rgba(0,229,176,0.25)',
          borderRadius: 16,
          boxShadow: '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,229,176,0.08)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'chatOpen 0.25s cubic-bezier(0.34,1.56,0.64,1) both',
          fontFamily: "'Space Grotesk', sans-serif",
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: '#0d1117',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(0,229,176,0.12)',
              border: '1.5px solid rgba(0,229,176,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00e5b0" strokeWidth="2">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 5v5l3 3"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#e6edf3', margin: 0 }}>Ask Surya's AI</p>
              <p style={{ fontSize: 11, color: '#00e5b0', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00e5b0', display: 'inline-block' }} />
                Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#6e7681', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '16px 14px 8px',
            maxHeight: 340, minHeight: 200,
          }}>
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {loading && <TypingIndicator />}
            {error && (
              <p style={{ textAlign: 'center', color: '#ff6b6b', fontSize: 12, margin: '8px 0' }}>
                {error}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestion chips — shown only at start */}
          {messages.length === 1 && (
            <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  className="ai-chip"
                  onClick={() => sendMessage(s)}
                  style={{
                    padding: '5px 11px',
                    fontSize: 11,
                    color: '#8b949e',
                    background: 'rgba(0,229,176,0.06)',
                    border: '1px solid rgba(0,229,176,0.2)',
                    borderRadius: 999,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '10px 14px 14px',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', gap: 8, alignItems: 'flex-end',
          }}>
            <textarea
              ref={inputRef}
              className="ai-input"
              rows={1}
              placeholder="Ask anything about Surya…"
              value={input}
              onChange={e => {
                setInput(e.target.value)
                // Auto-grow
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px'
              }}
              onKeyDown={handleKey}
              style={{
                flex: 1,
                background: '#0d1117',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '9px 12px',
                color: '#e6edf3',
                fontSize: 13,
                resize: 'none',
                lineHeight: 1.5,
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'border-color 0.2s',
                maxHeight: 100,
                overflow: 'auto',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,229,176,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
            <button
              className="ai-send"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: input.trim() ? 'rgba(0,229,176,0.15)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${input.trim() ? 'rgba(0,229,176,0.35)' : 'rgba(255,255,255,0.07)'}`,
                color: input.trim() ? '#00e5b0' : '#4a5568',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: input.trim() ? 'pointer' : 'default',
                transition: 'all 0.15s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Floating Action Button ── */}
      <button
        className="ai-fab"
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 52, height: 52, borderRadius: '50%',
          background: open ? '#0d1117' : 'rgba(0,229,176,0.15)',
          border: `2px solid ${open ? 'rgba(0,229,176,0.5)' : 'rgba(0,229,176,0.6)'}`,
          color: '#00e5b0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,229,176,0.2)',
          transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        }}
        aria-label="Chat with AI"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5b0" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00e5b0" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>
    </>
  )
}
