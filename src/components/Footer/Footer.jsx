// src/components/Footer/Footer.jsx
import React from 'react'
import './Footer.css'


const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Suryachamp' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/surya-sekhar-prajapati-632708262/' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Email', href: 'mailto:surya2004sekhar@gmail.com' },
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
