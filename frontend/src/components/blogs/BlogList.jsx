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

const BlogList = ({ setErrorMessage, theme, filter, onClearFilter, onOpenFilter }) => {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const sectionRef = useRef(null)

  useEffect(() => {
    // When the filter is applied, reset the current page to 1
    setCurrentPage(1)
  }, [filter])

  useEffect(() => {
    fetchBlogs(currentPage, filter)
  }, [currentPage, filter])

  const fetchBlogs = async (page, filter) => {
    try {
      const response = filter
        ? await blogService.getFiltered(page, filter.year, filter.month)
        : await blogService.getPaginated(page)

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

  // Map month numbers to names for better readability
  const monthNames = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }

  return (
    <Box>
      <HeroContainer scrollToBlogs={scrollToBlogs} />

      <SectionDivider ref={sectionRef} />

      {/* Pagination and Filter at the Top */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        scrollToBlogs={scrollToBlogs}
        filter={filter}
        monthNames={monthNames}
        onClearFilter={onClearFilter}
        onOpenFilter={onOpenFilter}
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

        {/* Pagination and Filter at the Bottom */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          scrollToBlogs={scrollToBlogs}
          filter={filter}
          monthNames={monthNames}
          onClearFilter={onClearFilter}
          onOpenFilter={onOpenFilter}
        />
      </Box>
    </Box>
  )
}

export default BlogList
