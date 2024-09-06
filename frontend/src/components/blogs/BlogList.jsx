import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Grid, Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { motion } from 'framer-motion'
import Blog from './Blog'
import AddBlog from './AddBlog'
import blogService from '../../services/blogs'
import { Typewriter } from 'react-simple-typewriter'
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'

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
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '12px 24px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.palette.primary.main,
  transition: 'transform 0.3s, background-color 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.primary.dark,
  },
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}))

const PaginationControls = ({ currentPage, totalPages, handlePreviousPage, handleNextPage, scrollToBlogs }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
      <Button
        variant="contained"
        onClick={() => {
          handlePreviousPage()
          scrollToBlogs('auto')  // No smooth scroll on pagination
        }}
        disabled={currentPage === 1}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
        startIcon={<ArrowLeft />}
      />
      <Typography sx={{ marginX: 2 }}>
        {currentPage} of {totalPages}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          handleNextPage()
          scrollToBlogs('auto')  // No smooth scroll on pagination
        }}
        disabled={currentPage === totalPages}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
        endIcon={<ArrowRight />}
      />
    </Box>
  )
}

const BlogList = ({ setErrorMessage, theme }) => {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const sectionRef = useRef(null)

  useEffect(() => {
    fetchBlogs(currentPage)
  }, [currentPage])

  const fetchBlogs = async (page) => {
    try {
      const response = await blogService.getPaginated(page)
      setBlogs(response.blogs)
      setTotalPages(response.totalPages)
    } catch (error) {
      setErrorMessage('Failed to load blogs')
    }
  }

  // Pagination handlers without smooth scroll
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  // Scroll to blogs with smooth scroll only from the hero section
  const scrollToBlogs = (behavior = 'smooth') => {
    sectionRef.current.scrollIntoView({ behavior })
  }

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url("/hero1.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          mb: '5%',
          px: '4%',
        }}
      >
        <HeroOverlay />
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            zIndex: 1,
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
          }}
          gutterBottom
        >
          <Typewriter
            words={['Indie Co. Blog']}
            loop={1}
            cursor
            cursorStyle=' >_'
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
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)',
          }}
        >
          Insights and Stories from the point of view of an Indie Developer.
        </Typography>
        <motion.div initial={{ opacity: 0.8, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}>
          <StyledButton size="large" variant="contained" color="primary" onClick={() => scrollToBlogs('smooth')}>
            Explore Posts
          </StyledButton>
        </motion.div>
      </Box>

      <SectionDivider ref={sectionRef} />

      {/* Top Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        scrollToBlogs={scrollToBlogs}
      />

      <Box sx={{ padding: 3 }}>
        {user && user.role === 'admin' && (
          <AddBlog blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
        )}

        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {blogs.map((blog) => (
            <Grid item xs={12} key={blog.id}>
              <Blog blog={blog} user={user} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
            </Grid>
          ))}
        </Grid>

        {/* Bottom Pagination Controls */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          scrollToBlogs={scrollToBlogs}
        />
      </Box>
    </Box>
  )
}

export default BlogList
