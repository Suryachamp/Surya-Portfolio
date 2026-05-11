// src/components/Skills/Skills.jsx
import React from 'react'
import './Skills.css'

// Skills data organized by category
const SKILL_CATEGORIES = [
  {
    title: 'Development Frameworks',
    count: 'React, Next.js, TailwindCSS...',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Programming & Problem Solving',
    count: 'JavaScript, C++, Data Structures',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
  },
  {
    title: 'Database Technologies',
    count: 'SQL, MongoDB, PHP',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: 'Tools & Platforms',
    count: 'GitHub, Vercel, Render...',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Design & Productivity',
    count: 'Figma, Canva, WordPress',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  }
]

const TECH_SKILLS = [
  {
    name: 'JavaScript',
    color: '#f7df1e',
    bg: 'rgba(247, 223, 30, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#f7df1e">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
  },
  {
    name: 'React',
    color: '#61dafb',
    bg: 'rgba(97, 218, 251, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#61dafb">
        <path d="M14.23 12.004a2.236 2.236 0 01-2.235 2.236 2.236 2.236 0 01-2.236-2.236 2.236 2.236 0 012.235-2.236 2.236 2.236 0 012.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 00-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 00-3.107-.534A23.892 23.892 0 0010.831 4.8a8.569 8.569 0 011.562-.542c.51-.197 1.013-.302 1.48-.302zm-7.26 1.59c.213 0 .437.034.668.1a8.48 8.48 0 011.562.542 23.657 23.657 0 00-2.184 1.963 23.641 23.641 0 00-3.107.536 11.25 11.25 0 01-.248-1.43c-.23-1.874.06-3.33.73-3.712a.8.8 0 01.58-.147v.148zm9.212 4.535a24.283 24.283 0 011.08 1.52 24.28 24.28 0 011.086 1.52 20.938 20.938 0 01-2.19.28 23.644 23.644 0 00.024-3.32zm-2.17-.617a24.85 24.85 0 011.24 2.053 24.906 24.906 0 011.24 2.054 24.66 24.66 0 01-2.479.117 24.66 24.66 0 01-2.479-.117 24.85 24.85 0 011.24-2.054 24.85 24.85 0 011.237-2.053zm-5.082 2.67a23.644 23.644 0 00.024 3.32 20.938 20.938 0 01-2.19-.28 24.28 24.28 0 011.086-1.52 24.283 24.283 0 011.08-1.52zm2.866-1.013a24.906 24.906 0 00-1.24 2.053 24.85 24.85 0 00-1.24 2.054 24.66 24.66 0 002.479.117 24.66 24.66 0 002.479-.117 24.906 24.906 0 00-1.24-2.054 24.85 24.85 0 00-1.238-2.053zM4.534 15.14a11.17 11.17 0 01.25-1.439 23.476 23.476 0 003.107.534 23.892 23.892 0 002.177 1.975 8.569 8.569 0 01-1.562.542c-.51.197-1.013.302-1.48.302-.213 0-.437-.034-.668-.1-.666-.382-.955-1.835-.73-3.704zm14.93 1.46c.226 1.87-.064 3.32-.73 3.705a.8.8 0 01-.58.147c-.213 0-.437-.034-.668-.1a8.48 8.48 0 01-1.562-.542 23.657 23.657 0 002.184-1.963 23.641 23.641 0 003.107-.536c.11.49.197.97.25 1.43v-.14zm-12.748.44a23.892 23.892 0 01-2.177-1.974 23.476 23.476 0 003.107-.534 11.17 11.17 0 01.25 1.439c.225 1.868-.065 3.32-.73 3.703a.8.8 0 01-.58.147c-.213 0-.437-.034-.668-.1z" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#ffffff',
    bg: 'rgba(255, 255, 255, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M14.435 15.655l-4.49-7.234H8.02v8.52h1.69v-6.3l4.08 6.54h1.7v-8.76h-1.69v7.234z" />
        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-1.5 0c0-4.694-3.806-8.5-8.5-8.5S3.5 7.306 3.5 12 7.306 20.5 12 20.5 20.5 16.694 20.5 12z" />
      </svg>
    ),
  },
  {
    name: 'TailwindCSS',
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#38bdf8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
  {
    name: 'MongoDB',
    color: '#47A248',
    bg: 'rgba(71, 162, 72, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#47A248">
        <path d="M11.996 23.996s-5.61-4.81-6.142-12.217c0 0-.25-2.905 1.637-5.592 0 0 3.86-5.875 4.14-6.185.253-.284.512-.047.512-.047s4.444 5.922 4.545 6.47c0 0 1.542 3.033 1.282 5.545-.487 4.707-5.974 11.96-5.974 11.96z" />
      </svg>
    ),
  },
  {
    name: 'SQL',
    color: '#336791',
    bg: 'rgba(51, 103, 145, 0.15)',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#336791">
        <path d="M21 5c0 1.66-4 3-9 3S3 6.66 3 5s4-3 9-3 9 1.34 9 3z" />
        <path d="M3 7v3c0 1.66 4 3 9 3s9-1.34 9-3V7c0 1.66-4 3-9 3S3 8.66 3 7z" />
        <path d="M3 12v3c0 1.66 4 3 9 3s9-1.34 9-3v-3c0 1.66-4 3-9 3S3 13.66 3 12z" />
        <path d="M3 17v3c0 1.66 4 3 9 3s9-1.34 9-3v-3c0 1.66-4 3-9 3S3 18.66 3 17z" />
      </svg>
    ),
  }
]

function Skills() {
  return (
    <section id="skills" className="skills section topo-bg">
      {/* Section connector */}
      <div className="section-connector">
        <div className="dot" />
        <div className="line" />
      </div>

      <div className="container">
        {/* Code tag decoration */}
        <div className="skills-code-tag">
          <span className="skills-code-bracket">&lt;/&gt;</span>
        </div>

        <div className="skills-header">
          <h2 className="skills-title">Skills</h2>
          <p className="skills-subtitle">I am striving to know stop learning and improving</p>
        </div>

        {/* Skill category cards */}
        <div className="skills-categories">
          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={i} className="skills-category-card">
              <div className="skills-category-icon">{cat.icon}</div>
              <div className="skills-category-info">
                <h3 className="skills-category-title">{cat.title}</h3>
                <p className="skills-category-count">{cat.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech skill icons */}
        <div className="skills-tech-grid">
          {TECH_SKILLS.map((tech, i) => (
            <div key={i} className="skills-tech-item" style={{ '--tech-color': tech.color, '--tech-bg': tech.bg }}>
              <div className="skills-tech-icon-wrapper">
                {tech.icon}
              </div>
              <span className="skills-tech-name">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Certifications */}
        {/* <div className="skills-certifications" style={{marginTop: '60px'}}>
          <h3 style={{fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--color-text-primary)', marginBottom: '24px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px', display: 'inline-block'}}>Certifications</h3>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, color: 'var(--color-text-secondary)'}}>
            <li style={{marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{color: 'var(--color-accent)'}}>✓</span> React Basics (Coursera)
            </li>
            <li style={{marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{color: 'var(--color-accent)'}}>✓</span> Javascript fundamentals (Coursera)
            </li>
            <li style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{color: 'var(--color-accent)'}}>✓</span> Problem Solving through programming in C (NPTEL)
            </li>
          </ul>
        </div> */}
      </div>
    </section>
  )
}

export default Skills
