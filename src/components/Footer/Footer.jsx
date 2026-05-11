// src/components/Footer/Footer.jsx
import React from 'react'
import './Footer.css'

const FOOTER_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Sitemap', href: '#' },
]

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Email', href: 'mailto:surya@example.dev' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">


      <div className="container">
        <div className="footer-inner">
          {/* Logo + tagline */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              <div className="css-logo">
                <span className="css-logo-text">surya</span>
              </div>
            </a>
            <p className="footer-tagline">
              Building things for the web — one commit at a time.
            </p>
          </div>

          {/* Links */}
          <nav className="footer-links" aria-label="Footer navigation">
            {FOOTER_LINKS.map(link => (
              <a key={link.label} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="footer-social">
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Surya. All rights reserved.
          </p>
          <p className="footer-credit">
            Designed &amp; Built by{' '}
            <a href="#" className="accent footer-credit-link">Surya</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
