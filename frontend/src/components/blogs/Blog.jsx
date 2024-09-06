import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import { styled } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import EditBlogModal from './EditBlogModal'
import blogService from '../../services/blogs'
import CommentList from '../comments/CommentList'
import Togglable from '../common/Togglable'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'

const StyledCard = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
}))

const TitleSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}))

const MetaData = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  '& > *': {
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
}))

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

  const formattedDate = format(new Date(blog.date), 'dd-MM-yyyy')

  return (
    <Box mt={2} sx={{ maxWidth: '100%', overflow: 'hidden', wordWrap: 'break-word' }}>
      <StyledCard>
        <TitleSection>
          <Typography variant="h4" gutterBottom>
            {blog.title}
          </Typography>
          <MetaData>
            <Box>
              <CalendarTodayIcon fontSize="small" sx={{ marginRight: 0.5 }} />
              <Typography variant="body2">{formattedDate}</Typography>
            </Box>
            <Box>
              <PersonIcon fontSize="small" sx={{ marginRight: 0.5 }} />
              <Typography variant="body2">By {blog.author}</Typography>
            </Box>
          </MetaData>
        </TitleSection>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Add className to blog content container for targeting in useEffect */}
        <Typography
          variant="body1"
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content),
          }}
          sx={{ marginBottom: 4 }}
        />

        {user && user.role === 'admin' && (
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => handleEdit(blog)}
            >
              Edit Post
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(blog.id)}
            >
              Delete Post
            </Button>
          </Box>
        )}
        <Togglable
          buttonLabel="View Comments"
          buttonLabelClose="Close Comments"
        >
          <CommentList
            blog={blog}
            user={user}
            setErrorMessage={setErrorMessage}
          />
        </Togglable>
      </StyledCard>

      <EditBlogModal
        open={editModalOpen}
        blog={editingBlog}
        setBlogs={setBlogs}
        setErrorMessage={setErrorMessage}
        onClose={() => setEditModalOpen(false)}
      />
    </Box>
  )
}

export default Blog