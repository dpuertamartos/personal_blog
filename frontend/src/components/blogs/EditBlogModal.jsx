import { useState, useEffect } from 'react'
import { Box, Modal, Typography, TextField, Button } from '@mui/material'
import blogService from '../../services/blogs'
import QuillEditor from '../common/QuillEditor'

const EditBlogModal = ({ open, blog, setBlogs, setErrorMessage, onClose }) => {
  const [editingBlog, setEditingBlog] = useState(blog)

  useEffect(() => {
    setEditingBlog(blog)
  }, [blog])

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditingBlog((prevBlog) => ({ ...prevBlog, [name]: value }))
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      if (editingBlog) {
        const updatedBlog = await blogService.update(editingBlog.id, {
          title: editingBlog.title,
          content: editingBlog.content,
          author: editingBlog.author,
        })
        setBlogs((blogs) =>
          blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        )
        onClose()
      }
    } catch (error) {
      console.error('Failed to update blog post', error)
      setErrorMessage('Failed to update blog post')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (!editingBlog) return null

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
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
        }}
      >
        <Typography variant="h6" mb={2}>
          Edit Blog
        </Typography>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Title"
            name="title"
            value={editingBlog.title || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <QuillEditor
            value={editingBlog.content || ''}
            onChange={(content) => setEditingBlog({ ...editingBlog, content })}
          />
          <TextField
            label="Author"
            name="author"
            value={editingBlog.author || ''}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default EditBlogModal
