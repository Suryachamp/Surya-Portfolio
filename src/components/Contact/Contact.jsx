// src/components/Contact/Contact.jsx
import React, { useState } from 'react'
import './Contact.css'
import emailjs from '@emailjs/browser'


// Contact form field config
const FORM_FIELDS = [
  { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe', half: true },
  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', half: true },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Inquiry', half: false },
  { id: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell me about your project…', half: false },
]

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'surya2004sekhar@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Jaipur, India',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 7980280372',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
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
    await emailjs.send(
      'service_j1ew6p5',
      'template_vuxu4v8',
      formData,
      'A60hsr4mr12gA70Gm'
    )
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="contact section">
      {/* Section connector */}
      <div className="section-connector">
        <div className="dot" />
        <div className="line" />
      </div>

      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title">Contact</h2>
          <p className="contact-subtitle">Currently available for freelance work</p>
          <a href="mailto:surya2004sekhar@gmail.com" className="contact-cta-btn">
            Send Me A Message
          </a>
        </div>

        <div className="contact-content">
          {/* Contact info */}
          <div className="contact-info">
            {CONTACT_INFO.map((info, i) => (
              <div key={i} className="contact-info-item">
                <div className="contact-info-icon">{info.icon}</div>
                <div>
                  <p className="contact-info-label">{info.label}</p>
                  <p className="contact-info-value">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-fields">
              {FORM_FIELDS.map(field => (
                <div
                  key={field.id}
                  className={`contact-field ${field.half ? 'contact-field--half' : ''}`}
                >
                  <label htmlFor={field.id} className="contact-label">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      id={field.id}
                      className="contact-input contact-textarea"
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
                      className="contact-input"
                      placeholder={field.placeholder}
                      value={formData[field.id]}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            <button type="submit" className={`contact-submit ${submitted ? 'contact-submit--sent' : ''}`}>
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
