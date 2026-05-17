// src/components/Works/Works.jsx
import React, { useState } from 'react'
import './Works.css'
import BudgetBoxImg from '../../media/Budget-box.png'
import BudgetDataImg from '../../media/Budget-data.png'
import SMDashboardImg from '../../media/SM-dashboard.png'
import SMAddStudentImg from '../../media/SM-add-student.png'

// Project data
const PROJECTS = [
  {
    id: 1,
    title: 'Budget Box',
    description: 'Offline-first budgeting application featuring a dynamic analytics dashboard for financial insights and Node.js + PostgreSQL sync APIs.',
    tags: ['Next.js', 'IndexedDB', 'Node.js', 'PostgreSQL'],
    url: 'https://budgetboxfrontend.vercel.app/',
    images: [BudgetBoxImg, BudgetDataImg],
  },
  {
    id: 2,
    title: 'Quorium Student Management System',
    description: 'Responsive student management app with a dashboard, searchable list, and add-student form using the DummyJSON API.',
    tags: ['React', 'TailwindCSS', 'shadcn/ui'],
    url: 'https://spiffy-cobbler-ce6d95.netlify.app/',
    images: [SMDashboardImg, SMAddStudentImg],
  },
  {
    id: 3,
    title: 'Nagrik And Samvidhan',
    description: 'AI-assisted learning app using Gemini API for summarization, featuring gamified modules like Snake & Ladder and quizzes.',
    tags: ['React', 'Gemini API', 'JavaScript', 'CSS'],
    url: '#',
  },
]

function Works() {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = () => setActiveIndex(i => (i - 1 + PROJECTS.length) % PROJECTS.length)
  const next = () => setActiveIndex(i => (i + 1) % PROJECTS.length)

  const project = PROJECTS[activeIndex]

  return (
    <section id="works" className="works section">
      {/* Section connector */}
      <div className="section-connector">
        <div className="dot" />
        <div className="line" />
      </div>

      <div className="container">
        <div className="works-header">
          <h2 className="works-title">Works</h2>
          <p className="works-subtitle">I feel the pleasure of working with these website projects</p>
        </div>

        <div className="works-carousel">
          {/* Prev button */}
          <button
            className="works-nav-btn works-nav-btn--prev"
            onClick={prev}
            aria-label="Previous project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Project display */}
          <div className="works-project-card" key={project.id}>
            {/* Mock browser / screen UI or Images */}
            {project.images ? (
              <div className="works-project-images">
                <img src={project.images[0]} alt={`${project.title} main screenshot`} className="works-image-main" loading="lazy" width="600" height="400" />
                {project.images[1] && (
                  <img src={project.images[1]} alt={`${project.title} secondary screenshot`} className="works-image-secondary" loading="lazy" width="600" height="400" />
                )}
              </div>
            ) : (
            <div className="works-mock-screen">
              <div className="works-screen-header">
                <div className="works-screen-dots">
                  <span style={{ background: '#ff5f57' }} />
                  <span style={{ background: '#febc2e' }} />
                  <span style={{ background: '#28c840' }} />
                </div>
                <div className="works-screen-bar" />
              </div>
              <div className="works-screen-body">
                {/* Simulated code editor / preview */}
                <div className="works-screen-preview">
                  <div className="works-code-line" style={{ width: '80%' }} />
                  <div className="works-code-line" style={{ width: '60%' }} />
                  <div className="works-code-line works-code-line--accent" style={{ width: '90%' }} />
                  <div className="works-code-line" style={{ width: '50%' }} />
                  <div className="works-code-line works-code-line--accent" style={{ width: '70%' }} />
                  <div className="works-code-line" style={{ width: '85%' }} />
                  <div className="works-code-line" style={{ width: '40%' }} />
                </div>
                {/* Right panel: browser preview */}
                <div className="works-browser-preview">
                  <div className="works-browser-nav">
                    <div className="works-browser-dot" />
                    <div className="works-browser-dot" />
                    <div className="works-browser-dot" />
                  </div>
                  <div className="works-browser-content">
                    <div className="works-preview-bar" style={{ width: '70%', height: '8px', background: 'var(--color-accent)', opacity: 0.3, marginBottom: '6px', borderRadius: '4px' }} />
                    <div className="works-preview-bar" style={{ width: '90%', height: '4px', background: 'var(--color-border)', marginBottom: '4px', borderRadius: '4px' }} />
                    <div className="works-preview-bar" style={{ width: '60%', height: '4px', background: 'var(--color-border)', borderRadius: '4px' }} />
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Info + CTA */}
            <div className="works-project-info">
              <h3 className="works-project-title">{project.title}</h3>
              <p className="works-project-desc">{project.description}</p>
              <div className="works-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="works-tag">{tag}</span>
                ))}
              </div>
              <a href={project.url} className="works-view-btn" target="_blank" rel="noreferrer">
                View Website
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Next button */}
          <button
            className="works-nav-btn works-nav-btn--next"
            onClick={next}
            aria-label="Next project"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="works-indicators">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              className={`works-indicator ${i === activeIndex ? 'works-indicator--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Works
