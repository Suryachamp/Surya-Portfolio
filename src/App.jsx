// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AiChat from './components/AiChat/AiChat'
import PageTransition from './components/PageTransition/PageTransition'

function App() {
  return (
    <>
      <PageTransition />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* AI Chat floating widget — renders on every page */}
      <AiChat />
    </>
  )
}

export default App
