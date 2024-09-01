import { createContext, useContext, useState, useEffect } from 'react'
import loginService from '../services/login'
import { setToken } from '../services/api' // Import setToken

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token) // Set token when user is found in localStorage
    }
  }, [])

  const login = async (credentials) => {
    const user = await loginService.login(credentials)
    setUser(user)
    setToken(user.token) // Set token on successful login
    window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    setToken(null) // Clear token on logout
    window.localStorage.removeItem('loggedAppUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
