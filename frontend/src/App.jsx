import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CssBaseline, useTheme, useMediaQuery, Box, Modal } from '@mui/material'
import Footer from './components/common/Footer'
import noteService from './services/notes'
import LoginForm from './components/common/LoginForm'
import Notification from './components/common/Notification'
import Contact from './views/Contact'
import Profile from './views/Profile'
import PrivacyPolicy from './views/PrivacyPolicy'
import Home from './views/Home'
import Notes from './views/Notes'
import Blog from './views/Blog'
import SmallScreenNavMenu from './components/common/DrawerSmallScreenNavigation'
import TopMenu from './components/common/AppBar'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLoginOpen = () => {
    setLoginVisible(true)
  }

  const handleLoginClose = () => {
    setLoginVisible(false)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedAppUser')
    setUser(null)
  }

  const linkStyle = {
    fontWeight: 600,
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamily,
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    '&.active': {
      color: theme.palette.primary.main,
    },
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <TopMenu
        location={location}
        theme={theme}
        linkStyle={linkStyle}
        isLargeScreen={isLargeScreen}
        handleDrawerToggle={handleDrawerToggle}
        handleMenuToggle={handleMenuToggle}
        user={user}
        onLogin={handleLoginOpen}
        onLogout={handleLogout}
      />

      <Modal open={loginVisible} onClose={handleLoginClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: 'none',
        }}>
          <LoginForm setUser={setUser} closeModal={handleLoginClose} />
        </Box>
      </Modal>

      <Notification message={errorMessage} />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/blogs" element={<Blog user={user} />} />
          <Route path="/notes" element={<Notes theme={theme} isLargeScreen={isLargeScreen} drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} user={user} setErrorMessage={setErrorMessage}/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy_policy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>

      <SmallScreenNavMenu linkStyle={linkStyle} location={location} theme={theme} menuOpen={menuOpen} handleMenuToggle={handleMenuToggle} user={user} onLogin={handleLoginOpen} onLogout={handleLogout}/>

      <Footer />
    </Box>
  )
}

export default App
