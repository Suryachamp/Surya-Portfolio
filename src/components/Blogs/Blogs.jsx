// src/components/Blogs/Blogs.jsx
import React from 'react'

const BLOGS = [
  {
    id: 1,
    title: 'What does it take to become a web developer?',
    excerpt: 'Web development starts at a point that many of us are curious about — designing and building products that people use every day. If you\'re a developer from Ohio...',
    date: 'Nov 2024',
    readTime: '5 min',
    category: 'Career',
    tags: ['Web Dev', 'Career', 'Tech'],
  },
  {
    id: 2,
    title: 'Mastering CSS Grid: A Complete Guide',
    excerpt: 'CSS Grid is one of the most powerful layout systems available in CSS. It allows you to control both rows and columns simultaneously...',
    date: 'Oct 2024',
    readTime: '8 min',
    category: 'CSS',
    tags: ['CSS', 'Layout', 'Design'],
  },
  {
    id: 3,
    title: 'React Hooks: From useState to Custom Hooks',
    excerpt: 'React Hooks fundamentally changed how we write React components. In this article we explore the full hooks API and build our own custom hooks.',
    date: 'Sep 2024',
    readTime: '12 min',
    category: 'React',
    tags: ['React', 'JavaScript', 'Hooks'],
  },
]

function BlogCard({ blog }) {
  return (
    <article className="group grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-4 sm:gap-6 bg-bg-card border border-white/[0.07] rounded-md p-[14px] sm:p-5 transition-all duration-300 cursor-pointer hover:border-accent-border hover:-translate-y-[3px] hover:shadow-accent">
      {/* Thumbnail */}
      <div className="relative rounded-sm overflow-hidden bg-bg-secondary border border-white/[0.07] aspect-square flex items-center justify-center flex-shrink-0 self-start">
        <div className="flex items-center justify-center w-full h-full">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00e5b0" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <span className="absolute top-[6px] left-[6px] text-[9px] font-semibold uppercase tracking-[0.05em] text-bg-primary bg-accent rounded-pill px-[7px] py-[2px]">
          {blog.category}
        </span>
      </div>

      {/* Body */}
      <div>
        <h3 className="text-sm sm:text-base font-semibold text-text-primary mb-2 leading-[1.4] transition-colors duration-200 group-hover:text-accent">
          {blog.title}
        </h3>
        <p className="text-[13px] text-text-secondary leading-[1.7] mb-[14px] line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex gap-[6px] flex-wrap">
            {blog.tags.map(tag => (
              <span key={tag} className="text-[10px] text-text-muted bg-bg-secondary border border-white/[0.07] rounded-pill px-2 py-[2px]">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-[5px] text-[11px] text-text-muted font-display flex-shrink-0">
            <span>{blog.date}</span>
            <span className="opacity-40">·</span>
            <span>{blog.readTime} read</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function Blogs() {
  return (
    <section id="blogs" className="topo-bg bg-bg-primary py-[100px] relative">
      {/* Section connector */}
      <div className="flex flex-col items-center max-w-[1140px] mx-auto mb-4 px-6 md:pl-[84px]">
        <div className="w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_12px_#00e5b0]" />
        <div className="w-[2px] h-[60px] bg-gradient-to-b from-transparent to-accent" />
      </div>

      <div className="max-w-[1140px] mx-auto px-6 md:pl-[84px]">
        <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold text-text-primary mb-[10px]">Blogs</h2>
          <p className="text-sm text-text-muted">My thoughts on technology and business, welcome to subscribe</p>
        </div>

        <div className="flex flex-col gap-5 mb-10">
          {BLOGS.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <a href="#" className="inline-flex items-center justify-center text-[13px] font-semibold rounded-pill px-7 py-[10px] bg-bg-card border border-white/[0.07] text-text-secondary font-display transition-all duration-200 hover:border-accent-border hover:text-accent hover:bg-accent-dim">
            Read More
          </a>
          <a href="#" className="inline-flex items-center justify-center text-[13px] font-semibold rounded-pill px-7 py-[10px] bg-accent border border-accent text-bg-primary font-display transition-all duration-200 hover:opacity-90 hover:scale-[1.02]">
            Subscribe
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blogs
