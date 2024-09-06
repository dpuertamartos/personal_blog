import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Grid, Box } from '@mui/material'
import { styled } from '@mui/system'
import Blog from './Blog'
import AddBlog from './AddBlog'
import blogService from '../../services/blogs'
import HeroContainer from './HeroContainer'
import PaginationControls from './PaginationControls'

const SectionDivider = styled(Box)(({ theme }) => ({
  height: '2px',
  width: '100%',
  background: theme.palette.divider,
  margin: theme.spacing(4, 0),
}))

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

  const scrollToBlogs = (behavior = 'smooth') => {
    sectionRef.current.scrollIntoView({ behavior })
  }

  return (
    <Box>
      <HeroContainer scrollToBlogs={scrollToBlogs}/>

      <SectionDivider ref={sectionRef} />

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
