import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton
} from '@mui/material'
import { styled } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import blogService from '../../services/blogs'
import CommentList from '../comments/CommentList'
import Togglable from '../common/Togglable'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'
import EditBlogModal from './EditBlogModal'
import ShareMenu from '../common/ShareMenu'

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

const Blog = ({ blog, user, setBlogs, setErrorMessage, handleLoginOpen }) => {
  const [likes, setLikes] = useState(blog.likeCount || 0)
  const [dislikes, setDislikes] = useState(blog.dislikeCount || 0)
  const [vote, setVote] = useState(localStorage.getItem(`blog_${blog.id}_vote`) || null)
  const [editingBlog, setEditingBlog] = useState(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const handleVote = async (type) => {
    if (!user) {
      setErrorMessage('You must be logged in to vote')
      handleLoginOpen()
      setTimeout(() => setErrorMessage(null), 5000)
      return
    }

    try {
      const response = await blogService.vote(blog.id, type)
      if (response.status === 200) {
        const updatedBlog = { ...blog } // Make a copy of the blog object
        if (type === 'like') {
          updatedBlog.likeCount = blog.likeCount + 1
          setLikes(likes + 1)
        } else if (type === 'dislike') {
          updatedBlog.dislikeCount = blog.dislikeCount + 1
          setDislikes(dislikes + 1)
        }
        setVote(type)

        // Update the local blogs state in BlogList
        setBlogs((prevBlogs) =>
          prevBlogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
        )

        localStorage.setItem(`blog_${blog.id}_vote`, type)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error
        const voteType = errorMessage.includes('like') ? 'like' : 'dislike'
        localStorage.setItem(`blog_${blog.id}_vote`, voteType) // Update local storage even if already voted
        setErrorMessage(`You have already voted: ${voteType}`)
      } else {
        setErrorMessage('Failed to send vote')
      }
      setTimeout(() => setErrorMessage(null), 5000) // Clear error message after 5 seconds
    }
  }

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
            <Box>
              <ShareMenu
                title={blog?.title || 'IndieCoDev Blog'}
                url={`https://indiecodev.com/blog/${blog?.id}`}
                description={blog?.description || 'Read more about development and startups on this IndieCoDev Blog'}
              />
            </Box>

            {/* Voting Buttons */}
            <Box display="flex" gap={2} alignItems="center" sx={{ marginLeft: 'auto' }}>
              <IconButton
                onClick={() => handleVote('like')}
                sx={{
                  color: vote === 'like' ? 'green' : 'inherit',
                  opacity: vote ? 0.8 : 1,
                  pointerEvents: vote ? 'none' : 'auto',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: vote === 'like' ? 'green' : 'transparent',
                  },
                }}
              >
                <ThumbUpIcon />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {likes}
                </Typography>
              </IconButton>

              <IconButton
                onClick={() => handleVote('dislike')}
                sx={{
                  color: vote === 'dislike' ? 'red' : 'inherit',
                  opacity: vote ? 0.8 : 1,
                  pointerEvents: vote ? 'none' : 'auto',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    height: '2px',
                    backgroundColor: vote === 'dislike' ? 'red' : 'transparent',
                  },
                }}
              >
                <ThumbDownIcon />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {dislikes}
                </Typography>
              </IconButton>
            </Box>
          </MetaData>
        </TitleSection>
        <Divider sx={{ marginBottom: 2 }} />

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
            handleLoginOpen={handleLoginOpen}
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
