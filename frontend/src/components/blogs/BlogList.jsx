import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Grid, Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { motion } from 'framer-motion'
import Blog from './Blog'
import AddBlog from './AddBlog'
import blogService from '../../services/blogs'
import { Typewriter } from 'react-simple-typewriter' // Import Typewriter from react-simple-typewriter

const SectionDivider = styled(Box)(({ theme }) => ({
  height: '2px',
  width: '100%',
  background: theme.palette.divider,
  margin: theme.spacing(4, 0),
}))

const HeroOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Increased opacity for better text contrast
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '12px 24px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.palette.primary.main, // Ensure contrast with the text
  transition: 'transform 0.3s, background-color 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.primary.dark, // Darker color on hover
  },
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`, // Accessibility improvement
  },
}))

const BlogList = ({ setErrorMessage, theme }) => {
  const { user } = useAuth() // Use context to get user info
  const [blogs, setBlogs] = useState([])
  const sectionRef = useRef(null) // Ref for SectionDivider

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
      .catch(error => setErrorMessage('Failed to load blogs'))
  }, [setErrorMessage])

  const scrollToBlogs = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' }) // Smooth scroll to SectionDivider
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url("/hero1.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh', // Reduced height for better content balance
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          mb: '5%', // Less margin for more compact design
          px: '4%',
        }}
      >
        <HeroOverlay />
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            zIndex: 1,
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)', // Text shadow for better readability
          }}
          gutterBottom
        >
          {/* Typewriter effect for the main text */}
          <Typewriter
            words={['Indie Co. Blog']}
            loop={1}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            zIndex: 1,
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)', // Subtle text shadow for subtext
          }}
        >
          Insights and Stories from the point of view of an Indie Developer.
        </Typography>
        <motion.div initial={{ opacity: 0.8, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}>
          <StyledButton size="large" variant="contained" color="primary" onClick={scrollToBlogs}>
            Explore Posts
          </StyledButton>
        </motion.div>
      </Box>

      {/* Section Divider for Scrolling Target */}
      <SectionDivider ref={sectionRef} />
      <Box sx={{ padding: 3 }}>
        {/* Blog List and Add Blog */}
        {user && user.role === 'admin' && (
          <AddBlog blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
        )}
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {blogs.map(blog => (
            <Grid item xs={12} key={blog.id}>
              <Blog blog={blog} user={user} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default BlogList
