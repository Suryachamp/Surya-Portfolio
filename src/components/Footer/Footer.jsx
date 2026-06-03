// src/components/Footer/Footer.jsx
import React from 'react'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Suryachamp' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/surya-sekhar-prajapati-632708262/' },
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'Email', href: 'mailto:surya2004sekhar@gmail.com' },
]

function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-bg-primary border-t border-white/[0.07] pt-12 pb-6">
      <div className="max-w-[1140px] mx-auto px-6 md:pl-[84px]">
        {/* Inner: stacks on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-8 sm:gap-10 mb-10">
          {/* Brand */}
          <div>
            <a href="#hero" className="inline-flex items-center gap-2 mb-3">
              <div className="css-logo">
                <span className="css-logo-text">surya</span>
              </div>
            </a>
            <p className="text-[13px] text-text-muted leading-[1.6] max-w-[240px]">
              Building things for the web — one commit at a time.
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-row flex-wrap gap-5 sm:gap-6">
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-[13px] text-text-secondary transition-colors duration-200 hover:text-accent"
                aria-label={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar: stacks + centers on mobile */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/[0.07] pt-6 gap-2 text-center sm:text-left">
          <p className="text-xs text-text-muted font-display">
            © {currentYear} Surya. All rights reserved.
          </p>
          <p className="text-xs text-text-muted font-display">
            Designed &amp; Built by{' '}
            <a href="#" className="text-accent transition-opacity duration-200 hover:opacity-80">Surya</a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
