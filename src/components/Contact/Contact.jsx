// src/components/Contact/Contact.jsx
import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const FORM_FIELDS = [
  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe', half: true },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', half: true },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Inquiry', half: false },
  { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me about your project…', half: false },
]

const CONTACT_INFO = [
  {
    label: 'Email', value: 'surya2004sekhar@gmail.com',
    icon: (<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>),
  },
  {
    label: 'Location', value: 'Jaipur, India',
    icon: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>),
  },
  {
    label: 'Phone', value: '+91 7980280372',
    icon: (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />),
  },
]

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await emailjs.send('service_j1ew6p5', 'template_vuxu4v8', formData, 'A60hsr4mr12gA70Gm')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="bg-bg-secondary py-[100px] relative">
      {/* Section connector */}
      <div className="flex flex-col items-center max-w-7xl mx-auto mb-4 px-6 md:pl-[84px]">
        <div className="w-[10px] h-[10px] rounded-full bg-accent shadow-[0_0_12px_#00e5b0]" />
        <div className="w-[2px] h-[60px] bg-gradient-to-b from-transparent to-accent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:pl-[84px]">
        <div className="text-center mb-14">
          <h2 className="text-[36px] font-bold text-text-primary mb-[10px]">Contact</h2>
          <p className="text-sm text-text-muted mb-6">Currently available for freelance work</p>
          <a href="mailto:surya2004sekhar@gmail.com"
            className="inline-flex items-center justify-center gap-2 font-display text-sm font-semibold text-bg-primary bg-accent rounded-pill px-8 py-3 transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-glow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Let's Connect
          </a>
        </div>

        {/* Grid: single col on mobile, 1fr 2fr on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-[60px] items-start">
          {/* Contact info — row on tablet, col on desktop/mobile */}
          <div className="flex flex-col gap-6 md:flex-col sm:flex-row sm:flex-wrap">
            {CONTACT_INFO.map((info, i) => (
              <div key={i} className="flex items-start gap-[14px] sm:flex-1 sm:min-w-[160px] md:flex-none md:min-w-0">
                <div className="w-9 h-9 bg-accent-dim border border-accent-border rounded-sm flex items-center justify-center text-accent flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {info.icon}
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] text-text-muted uppercase tracking-[0.06em] mb-[2px] font-display">{info.label}</p>
                  <p className="text-[13px] text-text-secondary font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-wrap gap-4">
              {FORM_FIELDS.map(field => (
                <div key={field.id}
                  className={`flex flex-col gap-[6px] w-full ${field.half ? 'sm:w-[calc(50%-8px)]' : ''}`}>
                  <label htmlFor={field.id} className="text-xs font-medium text-text-muted uppercase tracking-[0.05em] font-display">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      className="bg-bg-card border border-white/[0.07] rounded-sm text-text-primary text-sm px-4 py-3 outline-none w-full resize-y min-h-[120px] transition-all duration-200 placeholder:text-text-muted/60 focus:border-accent-border focus:shadow-[0_0_0_3px_rgba(0,229,176,0.08)] font-body"
                      placeholder={field.placeholder}
                      value={formData[field.id]}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      className="bg-bg-card border border-white/[0.07] rounded-sm text-text-primary text-sm px-4 py-3 outline-none w-full transition-all duration-200 placeholder:text-text-muted/60 focus:border-accent-border focus:shadow-[0_0_0_3px_rgba(0,229,176,0.08)] font-body"
                      placeholder={field.placeholder}
                      value={formData[field.id]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto self-start font-display text-sm font-semibold text-bg-primary rounded-pill px-8 py-3 border-none cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.02] hover:shadow-glow
                ${submitted ? 'bg-[#28c840]' : 'bg-accent'}`}
            >
              {submitted ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Message Sent!
                </>
              ) : (
                <>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
