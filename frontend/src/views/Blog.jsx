import { useState, useEffect } from 'react'
import { Box, Typography, Button, TextField } from '@mui/material'
import blogService from '../services/blogs'
import commentService from '../services/comments'

const Blog = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' })
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewBlog({ title: '', content: '', author: '' })
    } catch (error) {
      console.error('Failed to add blog', error)
    }
  }

  const addComment = async (blogId) => {
    try {
      const savedComment = await commentService.create({ content: newComment, blogId })
      setBlogs(blogs.map(blog => blog.id === blogId ? { ...blog, comments: blog.comments.concat(savedComment) } : blog))
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment', error)
    }
  }

  return (
    <Box>
      <Typography variant="h4">Blogs</Typography>
      {user && user.role === 'admin' && ( // Only show if user is an admin
        <form onSubmit={addBlog}>
          <TextField label="Title" name="title" value={newBlog.title} onChange={handleChange} fullWidth />
          <TextField label="Content" name="content" value={newBlog.content} onChange={handleChange} fullWidth multiline rows={4} />
          <TextField label="Author" name="author" value={newBlog.author} onChange={handleChange} fullWidth />
          <Button type="submit" variant="contained" color="primary">Add Blog</Button>
        </form>
      )}
      {blogs.map(blog => (
        <Box key={blog.id} mt={2}>
          <Typography variant="h5">{blog.title}</Typography>
          <Typography variant="body1">{blog.content}</Typography>
          <Typography variant="body2">By {blog.author}</Typography>
          <Typography variant="subtitle2" mt={2}>Comments:</Typography>
          {blog.comments.map(comment => (
            <Box key={comment.id} ml={2}>
              <Typography variant="body2">{comment.content}</Typography>
            </Box>
          ))}
          {user && (
            <Box mt={2}>
              <TextField
                label="New Comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                fullWidth
              />
              <Button onClick={() => addComment(blog.id)} variant="outlined" color="primary">Add Comment</Button>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  )
}

export default Blog
