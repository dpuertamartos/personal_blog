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
        <CardActions>
          <Grid container spacing={2} sx={{ marginLeft: 'auto' }}>
            {user && user.role === 'admin' && (
              <Box>
                <Box>
                  <Grid item xs={12}>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Button variant="outlined" color="primary" fullWidth onClick={() => handleEdit(blog)}>
                      Edit Post
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="outlined" color="secondary" fullWidth onClick={() => handleDelete(blog.id)}>
                      Delete Post
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
              </Box>
            )}
            <Grid item xs={12}>
              <Togglable buttonLabel="View Comments" buttonLabelClose="Close Comments">
                <CommentList blog={blog} user={user} setErrorMessage={setErrorMessage} />
              </Togglable>
            </Grid>
          </Grid>
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
