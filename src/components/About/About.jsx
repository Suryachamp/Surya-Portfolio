// src/components/About/About.jsx
import React from 'react'
import './About.css'

function About() {
  return (
    <section id="about" className="about section topo-bg">
      {/* Section connector */}
      <div className="section-connector">
        <div className="dot" />
        <div className="line" />
      </div>

      <div className="container">
        <div className="about-content">
          {/* Left: Text content */}
          <div className="about-text">
            <div className="about-tag">
              <span className="about-tag-text">About Me</span>
            </div>

            <h2 className="about-heading">Hello!</h2>

            <p className="about-bio">
              Detail-oriented Computer Science student with hands-on experience developing responsive web applications, offline-first systems, student management platforms, and AI-assisted learning tools.
            </p>

            <p className="about-bio about-bio--secondary">
              Skilled in building scalable front-end interfaces, integrating REST APIs, creating analytics dashboards, and delivering production-quality features. Strong foundation in <span className="accent">JavaScript</span>, <span className="accent">React</span>, <span className="accent">Next.js</span>, and modern front-end development practices.
            </p>
          </div>

          {/* Right: Image */}
          <div className="about-image-wrapper">
            <div className="about__image-frame">
              <div className="about__terminal">
                <div className="about__terminal-header">
                  <span style={{background:'#ff5f57'}}/>
                  <span style={{background:'#febc2e'}}/>
                  <span style={{background:'#28c840'}}/>
                  <span className="about__terminal-title">surya.js</span>
                </div>
                <div className="about__terminal-body">
                  <p><span className="t-purple">const</span> <span className="t-blue">developer</span> = {'{'}</p>
                  <p>&nbsp;&nbsp;<span className="t-green">name</span>: <span className="t-yellow">"Surya"</span>,</p>
                  <p>&nbsp;&nbsp;<span className="t-green">role</span>: <span className="t-yellow">"Full Stack Dev"</span>,</p>
                  <p>&nbsp;&nbsp;<span className="t-green">skills</span>: [</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-yellow">"React"</span>, <span className="t-yellow">"Node"</span>,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="t-yellow">"MongoDB"</span></p>
                  <p>&nbsp;&nbsp;],</p>
                  <p>&nbsp;&nbsp;<span className="t-green">available</span>: <span className="t-purple">true</span></p>
                  <p>{'}'}</p>
                  <p className="t-blink">█</p>
                </div>
              </div>
            </div>
            {/* Decorative border accent */}
            <div className="about-image-accent" />
          </div>
        </div>

        {/* Experience & Education Timeline */}
        <div className="about-timeline-wrapper">
          {/* Experience */}
          <div className="about-timeline">
            <h3 className="about-timeline-title">Experience</h3>
            <div className="about-timeline-item">
              <div className="about-timeline-dot"></div>
              <h4 className="about-timeline-role">Front End Developer</h4>
              <p className="about-timeline-org">Ubuy Technologies Pvt. Ltd. | Jaipur, India</p>
              <p className="about-timeline-date">Jan 2026 – Present</p>
              <ul className="about-timeline-desc">
                <li>Built clean, responsive, and reusable web pages using HTML, SCSS, and Bootstrap.</li>
                <li>Developed components and pages in Next.js, gaining hands-on experience with routing, SSR, and modular architecture.</li>
                <li>Designed and optimized mobile-first responsive layouts.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="about-timeline">
            <h3 className="about-timeline-title">Education</h3>
            <div className="about-timeline-item">
              <div className="about-timeline-dot"></div>
              <h4 className="about-timeline-role">B.Tech in Computer Science</h4>
              <p className="about-timeline-org">University of Engineering and Management | Jaipur, India</p>
              <p className="about-timeline-date">2022 – 2026 | GPA: 8.12/10</p>
            </div>
            <div className="about-timeline-item">
              <div className="about-timeline-dot"></div>
              <h4 className="about-timeline-role">WBCHSE</h4>
              <p className="about-timeline-org">Nava Nalanda School | Kolkata, India</p>
              <p className="about-timeline-date">2022 | Percentage: 86%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About