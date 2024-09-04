import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Typography, Grid, Box } from '@mui/material'
import Blog from './Blog'
import AddBlog from './AddBlog'
import blogService from '../../services/blogs'

const BlogList = ({ setErrorMessage }) => {
  const { user } = useAuth() // Use context to get user info
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
      .catch(error => setErrorMessage('Failed to load blogs'))
  }, [setErrorMessage])

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Blogs
      </Typography>
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
  )
}

export default BlogList
