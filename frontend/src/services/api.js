// src/services/api.js
import axios from 'axios'

let token = null

// Function to set token globally
export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

// Create a single axios instance for your application
const axiosInstance = axios.create({
  baseURL: '/api',
})

// Request interceptor to add auth token to headers if available
axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally, handle token expiration or unauthorized access globally
      // For example, you could log out the user
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
