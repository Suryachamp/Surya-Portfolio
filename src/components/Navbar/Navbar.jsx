// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.href.replace('#', ''))
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const matchedLink = NAV_LINKS.find(link => link.href === `#${entry.target.id}`)
            if (matchedLink) setActiveLink(matchedLink.label)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )
    sections.forEach(section => observer.observe(section))
    return () => sections.forEach(section => observer.unobserve(section))
  }, [])

  const handleNavClick = (label, href) => {
    setActiveLink(label)
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300
        ${scrolled ? 'bg-[rgba(13,17,23,0.75)] backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.4)] py-3' : 'py-[18px]'}
        ${menuOpen ? '!bg-[rgba(13,17,23,0.95)] backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]' : ''}
      `}
    >
      <div className="max-w-[1140px] mx-auto px-6 md:pl-[84px] flex items-center gap-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 flex-shrink-0" onClick={() => handleNavClick('Home', '#hero')}>
          <div className="css-logo">
            <span className="css-logo-text">surya</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 ml-auto" aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm font-medium px-[14px] py-[6px] rounded-pill transition-all duration-200 tracking-wide
                ${activeLink === link.label
                  ? 'text-accent bg-accent-dim'
                  : 'text-text-secondary hover:text-text-primary hover:bg-accent-dim'
                }`}
              onClick={e => { e.preventDefault(); handleNavClick(link.label, link.href) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social icons — shown on mobile only */}
        <div className="md:hidden flex items-center gap-1 ml-auto">
          <a href="https://github.com/Suryachamp" target="_blank" rel="noreferrer"
            className="w-[34px] h-[34px] rounded-sm border border-transparent text-text-secondary flex items-center justify-center transition-all duration-200 hover:text-accent hover:border-accent-border hover:bg-accent-dim"
            aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/surya-sekhar-prajapati-632708262/" target="_blank" rel="noreferrer"
            className="w-[34px] h-[34px] rounded-sm border border-transparent text-text-secondary flex items-center justify-center transition-all duration-200 hover:text-accent hover:border-accent-border hover:bg-accent-dim"
            aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col gap-[5px] p-[6px] cursor-pointer bg-none border-none ${menuOpen ? 'hamburger-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className="block w-[22px] h-[2px] bg-text-secondary rounded-[2px] transition-all duration-300" />
          <span className="block w-[22px] h-[2px] bg-text-secondary rounded-[2px] transition-all duration-300" />
          <span className="block w-[22px] h-[2px] bg-text-secondary rounded-[2px] transition-all duration-300" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      <nav
        className={`md:hidden flex-col absolute top-full left-0 w-full bg-[rgba(13,17,23,0.95)] backdrop-blur-2xl overflow-hidden transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-b border-white/[0.08] ${menuOpen ? 'max-h-[400px] flex' : 'max-h-0 hidden'}`}
        aria-label="Mobile navigation"
      >
        {NAV_LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            className={`block px-6 py-4 text-[15px] border-b border-white/[0.07] transition-all duration-200
              ${activeLink === link.label ? 'text-accent bg-accent-dim' : 'text-text-secondary hover:text-accent hover:bg-accent-dim'}`}
            onClick={e => { e.preventDefault(); handleNavClick(link.label, link.href) }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export default Navbar
