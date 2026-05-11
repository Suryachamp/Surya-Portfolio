// src/components/Blogs/Blogs.jsx
import React from 'react'
import './Blogs.css'

// Blog post data
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
    <article className="blog-card">
      {/* Thumbnail placeholder */}
      <div className="blog-card-thumb">
        <div className="blog-card-thumb-inner">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <span className="blog-card-category">{blog.category}</span>
      </div>

      <div className="blog-card-body">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-excerpt">{blog.excerpt}</p>

        <div className="blog-card-meta">
          <div className="blog-card-tags">
            {blog.tags.map(tag => (
              <span key={tag} className="blog-card-tag">{tag}</span>
            ))}
          </div>
          <div className="blog-card-info">
            <span>{blog.date}</span>
            <span className="blog-card-dot">·</span>
            <span>{blog.readTime} read</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function Blogs() {
  return (
    <section id="blogs" className="blogs section topo-bg">
      {/* Section connector */}
      <div className="section-connector">
        <div className="dot" />
        <div className="line" />
      </div>

      <div className="container">
        <div className="blogs-header">
          <h2 className="blogs-title">Blogs</h2>
          <p className="blogs-subtitle">My thoughts on technology and business, welcome to subscribe</p>
        </div>

        {/* Blog cards list */}
        <div className="blogs-list">
          {BLOGS.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Actions */}
        <div className="blogs-actions">
          <a href="#" className="blogs-btn blogs-btn--read">Read More</a>
          <a href="#" className="blogs-btn blogs-btn--subscribe">Subscribe</a>
        </div>
      </div>
    </section>
  )
}

export default Blogs
