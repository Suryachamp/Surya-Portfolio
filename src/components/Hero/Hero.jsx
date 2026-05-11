// src/components/Hero/Hero.jsx
import React, { useEffect, useRef } from 'react'
import './Hero.css'
import heroAvatar from '../../media/hero_avatar.jpg'
import resumePdf from '../../media/Surya_Sekhar_Prajapati_Resume.pdf'


// Stats data
const STATS = [
  { value: '4+', label: 'Programming\nLanguages' },
  { value: '6+', label: 'Development\nTools' },
  { value: '8+', label: 'Years of\nExperience' },
]

function Hero() {
  const cursorRef = useRef(null)

  // Blinking cursor effect on title
  useEffect(() => {
    const interval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity =
          cursorRef.current.style.opacity === '0' ? '1' : '0'
      }
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="hero topo-bg section">
      {/* Left vertical social strip */}
      <aside className="hero-sidebar">
        <div className="hero-sidebar-line" />
        <div className="hero-sidebar-icons">
          <a href="https://github.com/Suryachamp" target="_blank" rel="noreferrer" aria-label="GitHub" className="hero-sidebar-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/surya-sekhar-prajapati-632708262/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hero-sidebar-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hero-sidebar-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://codepen.io" target="_blank" rel="noreferrer" aria-label="CodePen" className="hero-sidebar-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.144 13.067v-2.134L16.55 12zm1.276 1.194a.628.628 0 01-.006.083l-.005.028-.011.053-.01.031c-.005.016-.01.031-.017.047l-.014.03a.78.78 0 01-.021.043l-.019.03a.57.57 0 01-.08.1l-.026.025a.602.602 0 01-.036.03l-.886.596-4.281 2.876a.631.631 0 01-.715 0l-4.281-2.876-3.072-2.065-.371-.245c-.028-.019-.055-.04-.08-.062l-.019-.016a.836.836 0 01-.067-.065l-.024-.027a.7.7 0 01-.054-.079l-.026-.046c-.009-.017-.018-.034-.025-.051l-.016-.047-.013-.036-.007-.047-.003-.023A.628.628 0 016 13.067V10.933a.628.628 0 01.006-.083l.003-.023.007-.047.013-.036.016-.047.025-.051.026-.046a.7.7 0 01.054-.079l.024-.027a.836.836 0 01.067-.065l.019-.016c.025-.022.052-.043.08-.062l.371-.245 3.072-2.065 4.281-2.876a.631.631 0 01.715 0l4.281 2.876.886.596a.602.602 0 01.036.03l.026.025a.57.57 0 01.08.1l.019.03a.78.78 0 01.021.043l.014.03c.007.016.012.031.017.047l.01.031.011.053.005.028a.628.628 0 01.006.083v2.134zm-8.04-5.099L7.25 12l4.13 2.783V7.162zm.628 7.589l3.29-2.214-1.645-1.107zm5.503-7.159l-4.13 2.632v5.483l4.13-2.78V8.597z" />
            </svg>
          </a>
        </div>
        <div className="hero-sidebar-line" />
      </aside>

      {/* Main hero content */}
      <div className="container">
        <div className="hero-content">
          {/* Left: Text */}
          <div className="hero-text">
            <p className="hero-greeting">Hey</p>
            <h1 className="hero-title">
              I'm <span className="accent">Surya Sekhar</span>,
              <br />
              Front-End Developer
              <span className="hero-cursor" ref={cursorRef}>_</span>
            </h1>

            <p className="hero-description">
              Detail-oriented Computer Science student with hands-on experience developing responsive web applications, offline-first systems, and AI-assisted learning tools.
            </p>

            <a href="#contact" className="hero-cta">
              Let's Talk
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Center: Profile card */}
          <div className="hero-card-wrapper">
            <div className="hero-profile-card">
              <div className="hero-avatar">
                <img src={heroAvatar} alt="Surya" />
              </div>
              <div className="hero-profile-info">
                <h3 className="hero-profile-name">Surya</h3>
                <p className="hero-profile-role">Front-End Developer</p>
              </div>

              <div className="hero-profile-details">
                <div className="hero-detail-item">
                  <svg className="hero-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>surya2004sekhar@gmail.com</span>
                </div>
                <div className="hero-detail-item">
                  <svg className="hero-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Jaipur, India</span>
                </div>
                <div className="hero-detail-item">
                  <svg className="hero-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  <span>Full-time / Freelancer</span>
                </div>
                <div className="hero-detail-item">
                  <svg className="hero-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+91 7980280372</span>
                </div>
              </div>

              <div className="hero-profile-skills">
                <span>React</span>
                <span>Express</span>
                <span>MongoDB</span>
                <span>Nodejs</span>
              </div>

              <a href={resumePdf} download="Surya_Sekhar_Prajapati_Resume.pdf" className="hero-download-btn">
                Download CV
                <svg className="hero-download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Stats */}
          {/* <div className="hero-stats">
            {STATS.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-value accent">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Bottom scroll indicator */}
      {/* <div className="hero-scroll-hint">
        <div className="hero-scroll-dot" />
        <div className="hero-scroll-line" />
      </div> */}
    </section>
  )
}

export default Hero
