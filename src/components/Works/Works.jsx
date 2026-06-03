// src/components/Works/Works.jsx
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BudgetBoxImg from '../../media/Budget-box.png'
import BudgetDataImg from '../../media/Budget-data.png'
import SMDashboardImg from '../../media/SM-dashboard.png'
import SMAddStudentImg from '../../media/SM-add-student.png'

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
  return (
    <section id="works" className="bg-bg-secondary py-[100px] relative">
      {/* Section connector */}
      <div className="flex flex-col items-center max-w-[1140px] mx-auto mb-4 px-6 md:pl-[84px]">
        <div className="w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_12px_#00e5b0]" />
        <div className="w-[2px] h-[60px] bg-gradient-to-b from-transparent to-accent" />
      </div>

      <div className="max-w-[1140px] mx-auto px-6 md:pl-[84px]">
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold text-text-primary mb-[10px]">Works</h2>
          <p className="text-sm text-text-muted">I feel the pleasure of working with these website projects</p>
        </div>

        <div className="flex items-center gap-6">
          {/* Prev button */}
          <button className="works-nav-btn--prev w-11 h-11 rounded-full bg-bg-card border border-white/[0.07] text-text-secondary flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:bg-accent-dim hover:border-accent-border hover:text-accent cursor-pointer" aria-label="Previous project">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{ prevEl: '.works-nav-btn--prev', nextEl: '.works-nav-btn--next' }}
            pagination={{ el: '.works-indicators', clickable: true, bulletClass: 'works-indicator', bulletActiveClass: 'works-indicator--active' }}
            spaceBetween={40}
            slidesPerView={1}
            loop={true}
            className="flex-1 min-w-0"
          >
            {PROJECTS.map(project => (
              <SwiperSlide key={project.id}>
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center animate-fade-in">
                  {/* Image / mock screen */}
                  {project.images ? (
                    <div className="works-project-images">
                      <img src={project.images[0]} alt={`${project.title} main screenshot`} className="works-image-main" loading="lazy" width="600" height="400" />
                      {project.images[1] && (
                        <img src={project.images[1]} alt={`${project.title} secondary screenshot`} className="works-image-secondary" loading="lazy" width="600" height="400" />
                      )}
                    </div>
                  ) : (
                    <div className="bg-bg-primary border border-white/[0.07] rounded-md overflow-hidden shadow-card">
                      <div className="flex items-center gap-3 px-[14px] py-[10px] bg-bg-card border-b border-white/[0.07]">
                        <div className="flex gap-[5px]">
                          <span className="w-[10px] h-[10px] rounded-full block" style={{ background: '#ff5f57' }} />
                          <span className="w-[10px] h-[10px] rounded-full block" style={{ background: '#febc2e' }} />
                          <span className="w-[10px] h-[10px] rounded-full block" style={{ background: '#28c840' }} />
                        </div>
                        <div className="flex-1 h-[6px] bg-white/[0.07] rounded-sm" />
                      </div>
                      <div className="grid grid-cols-2 h-[200px]">
                        <div className="p-[14px] border-r border-white/[0.07] flex flex-col gap-2 justify-center">
                          {[80, 60, 90, 50, 70, 85, 40].map((w, i) => (
                            <div key={i} className={`h-[3px] rounded-sm ${i % 2 === 1 ? 'bg-accent/20' : 'bg-white/[0.08]'}`} style={{ width: `${w}%` }} />
                          ))}
                        </div>
                        <div className="p-[14px]">
                          <div className="flex gap-[5px] mb-[10px]">
                            {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/[0.07]" />)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Info */}
                  <div>
                    <h3 className="text-[22px] font-bold text-text-primary mb-3">{project.title}</h3>
                    <p className="text-sm text-text-secondary leading-[1.7] mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map(tag => (
                        <span key={tag} className="font-display text-[11px] text-accent bg-accent-dim border border-accent-border rounded-pill px-[10px] py-[3px]">{tag}</span>
                      ))}
                    </div>
                    <a href={project.url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-[6px] text-[13px] font-semibold text-text-primary bg-bg-card border border-white/[0.07] rounded-sm px-5 py-[10px] transition-all duration-200 hover:border-accent-border hover:text-accent hover:bg-accent-dim">
                      View Website
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Next button */}
          <button className="works-nav-btn--next w-11 h-11 rounded-full bg-bg-card border border-white/[0.07] text-text-secondary flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:bg-accent-dim hover:border-accent-border hover:text-accent cursor-pointer" aria-label="Next project">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="works-indicators flex justify-center gap-2 mt-8
          [&_.works-indicator]:w-2 [&_.works-indicator]:h-2 [&_.works-indicator]:rounded-full [&_.works-indicator]:bg-white/[0.07] [&_.works-indicator]:border-none [&_.works-indicator]:cursor-pointer [&_.works-indicator]:transition-all [&_.works-indicator]:duration-200
          [&_.works-indicator--active]:bg-accent [&_.works-indicator--active]:scale-[1.3]" />
      </div>
    </section>
  )
}

export default Works
