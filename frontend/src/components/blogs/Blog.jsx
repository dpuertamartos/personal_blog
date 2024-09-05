import { useState } from 'react'
import { Box, Typography, Button, Card, CardContent, CardActions, Grid } from '@mui/material'
import Divider from '@mui/material/Divider'
import EditBlogModal from './EditBlogModal'
import blogService from '../../services/blogs'
import CommentList from '../comments/CommentList'
import Togglable from '../common/Togglable'
import DOMPurify from 'dompurify'

const Blog = ({ blog, user, setBlogs, setErrorMessage }) => {
  const [editingBlog, setEditingBlog] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleEdit = (blog) => {
    setEditingBlog(blog)
    setEditModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.remove(id)
        setBlogs((blogs) => blogs.filter((b) => b.id !== id))
      } catch (error) {
        console.error('Failed to delete blog post', error)
        setErrorMessage('Failed to delete blog post')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <>
      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {blog.title}
          </Typography>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
          <Typography variant="body2" color="textSecondary" gutterBottom>
            By {blog.author}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          {user && user.role === 'admin' && (
            <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
              <Button variant="outlined" color="primary" onClick={() => handleEdit(blog)}>
                Edit Post
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleDelete(blog.id)}>
                Delete Post
              </Button>
              <Divider />
            </Box>
          )}
          <Togglable buttonLabel="View Comments" buttonLabelClose="Close Comments">
            <CommentList blog={blog} user={user} setErrorMessage={setErrorMessage} />
          </Togglable>
        </CardActions>
      </Card>

      <EditBlogModal
        open={editModalOpen}
        blog={editingBlog}
        setBlogs={setBlogs}
        setErrorMessage={setErrorMessage}
        onClose={() => setEditModalOpen(false)}
      />
    </>
  )
}

export default Blog
