// src/api/index.js
// Axios base instance — ready for future API integration
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (e.g. attach auth token)
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Response interceptor (e.g. global error handling)
api.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || error.message || 'Unknown error'
    console.error('[API Error]', message)
    return Promise.reject(error)
  }
)

export default api

// ---- Endpoint helpers ----
export const contactAPI = {
  /** Send contact form data */
  sendMessage: data => api.post('/contact', data),
}

export const blogsAPI = {
  /** Fetch all blog posts */
  getAll: () => api.get('/blogs'),
  /** Fetch single blog post by slug */
  getBySlug: slug => api.get(`/blogs/${slug}`),
}

export const projectsAPI = {
  /** Fetch all portfolio projects */
  getAll: () => api.get('/projects'),
}
