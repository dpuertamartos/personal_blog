import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import Blog from '../components/blogs/Blog' // Reusing the existing Blog component
import { Box, Typography, CircularProgress } from '@mui/material'

const BlogPostPage = ({ user, setErrorMessage, handleLoginOpen }) => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true) // Track the loading state
  const [notFound, setNotFound] = useState(false) // Track if the blog is not found
  const [error, setError] = useState(null) // Track any other errors

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true)
      try {
        const fetchedBlog = await blogService.get(id)
        if (fetchedBlog) {
          setBlog(fetchedBlog)
        } else {
          setNotFound(true) // Set not found if blog is null
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true) // Handle 404 specifically
        } else {
          setError('Failed to load blog. Please try again later.') // Generic error message
        }
      } finally {
        setLoading(false) // Stop loading after the request completes
      }
    }
    fetchBlog()
  }, [id])

  // Display loading spinner while fetching data
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    )
  }

  // Display 404 message if the blog is not found
  if (notFound) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h4" color="error">
          404 - Blog Not Found
        </Typography>
      </Box>
    )
  }

  // Display error message if something else goes wrong
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    )
  }

  // If blog data is successfully fetched, display the blog post
  return (
    <Box>
      <Blog
        blog={blog}
        user={user}
        setBlogs={(blogs) => setBlog(blogs[0])} // Simplified for single post view
        setErrorMessage={setErrorMessage}
        handleLoginOpen={handleLoginOpen}
      />
    </Box>
  )
}

export default BlogPostPage
