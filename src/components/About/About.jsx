// src/components/About/About.jsx
import React from 'react'

function About() {
  return (
    <section id="about" className="topo-bg bg-bg-secondary py-[100px] relative">
      {/* Section connector */}
      <div className="flex flex-col items-center max-w-7xl mx-auto mb-4 px-6 md:pl-[84px]">
        <div className="w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_12px_#00e5b0]" />
        <div className="w-[2px] h-[60px] bg-gradient-to-b from-transparent to-accent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:pl-[84px]">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-20">
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center px-[18px] py-[6px] border border-accent-border rounded-sm bg-accent-dim mb-7">
              <span className="font-display text-[13px] text-accent tracking-[0.05em]">About Me</span>
            </div>
            <h2 className="text-[42px] md:text-[42px] text-[32px] font-bold text-text-primary mb-5">Hello!</h2>
            <p className="text-sm leading-[1.8] text-text-secondary mb-4">
              Detail-oriented Computer Science student with hands-on experience developing responsive web applications, offline-first systems, student management platforms, and AI-assisted learning tools.
            </p>
            <p className="text-sm leading-[1.8] text-text-muted">
              Skilled in building scalable front-end interfaces, integrating REST APIs, creating analytics dashboards, and delivering production-quality features. Strong foundation in{' '}
              <span className="text-accent">JavaScript</span>,{' '}
              <span className="text-accent">React</span>,{' '}
              <span className="text-accent">Next.js</span>, and modern front-end development practices.
            </p>
          </div>

          {/* Right: Terminal */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden border border-white/[0.07] bg-bg-card" style={{ aspectRatio: '4/3' }}>
              <div className="w-full h-full bg-[#0d1117] rounded-xl overflow-hidden font-display">
                {/* Terminal header */}
                <div className="flex items-center gap-[6px] px-[14px] py-[10px] bg-bg-secondary border-b border-white/[0.07]">
                  <span className="w-[11px] h-[11px] rounded-full block" style={{ background: '#ff5f57' }} />
                  <span className="w-[11px] h-[11px] rounded-full block" style={{ background: '#febc2e' }} />
                  <span className="w-[11px] h-[11px] rounded-full block" style={{ background: '#28c840' }} />
                  <span className="text-xs text-text-muted ml-2">surya.js</span>
                </div>
                {/* Terminal body */}
                <div className="p-5 text-[13px] leading-[2] text-text-primary">
                  <p><span className="text-[#d2a8ff]">const</span> <span className="text-[#79c0ff]">developer</span> = {'{'}</p>
                  <p>&nbsp;&nbsp;<span className="text-[#7ee787]">name</span>: <span className="text-[#f0c27f]">"Surya"</span>,</p>
                  <p>&nbsp;&nbsp;<span className="text-[#7ee787]">role</span>: <span className="text-[#f0c27f]">"Full Stack Dev"</span>,</p>
                  <p>&nbsp;&nbsp;<span className="text-[#7ee787]">skills</span>: [</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#f0c27f]">"React"</span>, <span className="text-[#f0c27f]">"Node"</span>,</p>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#f0c27f]">"MongoDB"</span></p>
                  <p>&nbsp;&nbsp;],</p>
                  <p>&nbsp;&nbsp;<span className="text-[#7ee787]">available</span>: <span className="text-[#d2a8ff]">true</span></p>
                  <p>{'}'}</p>
                  <p className="t-blink">█</p>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="about-image-accent hidden md:block" />
          </div>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] mt-[60px] border-t border-white/[0.07] pt-[60px]">
          {/* Experience */}
          <div>
            <h3 className="font-display text-xl text-text-primary mb-[30px] inline-block border-b-2 border-accent pb-2">Experience</h3>
            <div className="relative pl-6 border-l border-accent-border mb-[30px]">
              <div className="absolute left-[-5px] top-[6px] w-[9px] h-[9px] rounded-full bg-accent shadow-[0_0_10px_rgba(0,229,176,0.4)]" />
              <h4 className="text-base font-semibold text-text-primary mb-1">Front End Developer</h4>
              <p className="text-sm text-text-secondary mb-1">Ubuy Technologies Pvt. Ltd. | Jaipur, India</p>
              <p className="font-display text-xs text-accent mb-3">Jan 2026 – Present</p>
              <ul className="text-[13px] text-text-muted pl-4 list-disc space-y-[6px]">
                <li>Built clean, responsive, and reusable web pages using HTML, SCSS, and Bootstrap.</li>
                <li>Developed components and pages in Next.js, gaining hands-on experience with routing, SSR, and modular architecture.</li>
                <li>Designed and optimized mobile-first responsive layouts.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-display text-xl text-text-primary mb-[30px] inline-block border-b-2 border-accent pb-2">Education</h3>
            {[
              {
                role: 'B.Tech in Computer Science',
                org: 'University of Engineering and Management | Jaipur, India',
                date: '2022 – 2026 | GPA: 8.12/10',
              },
              {
                role: 'WBCHSE',
                org: 'Nava Nalanda School | Kolkata, India',
                date: '2022 | Percentage: 86%',
              },
            ].map((item, i) => (
              <div key={i} className="relative pl-6 border-l border-accent-border mb-[30px] last:mb-0">
                <div className="absolute left-[-5px] top-[6px] w-[9px] h-[9px] rounded-full bg-accent shadow-[0_0_10px_rgba(0,229,176,0.4)]" />
                <h4 className="text-base font-semibold text-text-primary mb-1">{item.role}</h4>
                <p className="text-sm text-text-secondary mb-1">{item.org}</p>
                <p className="font-display text-xs text-accent mb-3">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
