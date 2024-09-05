import { useState, useRef } from 'react'
import { Button, TextField, Paper, Typography, Box } from '@mui/material'
import { motion } from 'framer-motion'
import blogService from '../../services/blogs'
import Togglable from '../common/Togglable'
import QuillEditor from '../common/QuillEditor'

const AddBlog = ({ blogs, setBlogs, setErrorMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' })
  const blogFormRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewBlog({ title: '', content: '', author: '' })
    } catch (error) {
      console.error('Failed to add blog', error)
      setErrorMessage('Failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (
    <Togglable buttonLabel="New blog" buttonLabelClose="Close New Blog" ref={blogFormRef}>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add a New Blog
        </Typography>
        <form onSubmit={addBlog}>
          <TextField
            label="Title"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            component={motion.div}
            whileFocus={{ scale: 1.05 }}
          />
          <QuillEditor
            value={newBlog.content}
            onChange={(content) => setNewBlog({ ...newBlog, content })}
          />
          <TextField
            label="Author"
            name="author"
            value={newBlog.author}
            onChange={handleChange}
            fullWidth
            margin="normal"
            component={motion.div}
            whileFocus={{ scale: 1.05 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Add Blog
          </Button>
        </form>
      </Paper>
    </Togglable>
  )
}

export default AddBlog
