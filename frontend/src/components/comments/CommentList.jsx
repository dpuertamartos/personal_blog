import { useState, useEffect } from 'react'
import { Box, Typography, Button, Paper, Divider, IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import EditCommentModal from './EditCommentModal'
import commentService from '../../services/comments'
import AddComment from './AddComment'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const CommentList = ({ blog, user, setErrorMessage }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editCommentModalOpen, setEditCommentModalOpen] = useState(false)
  const [editingComment, setEditingComment] = useState(null)

  const fetchComments = async () => {
    try {
      const fetchedComments = await commentService.getByBlog(blog.id)
      setComments(fetchedComments)
    } catch (error) {
      console.error('Failed to fetch comments', error)
      setErrorMessage('Failed to fetch comments')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleAddComment = async () => {
    try {
      const savedComment = await commentService.create({ content: newComment, blogId: blog.id })
      setComments((prevComments) => [...prevComments, savedComment])
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment', error)
      setErrorMessage('Failed to add comment')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleEditComment = (comment) => {
    setEditingComment(comment)
    setEditCommentModalOpen(true)
  }

  const handleUpdateComment = async (updatedComment) => {
    try {
      const savedComment = await commentService.update(updatedComment.id, {
        content: updatedComment.content,
      })
      setComments((prevComments) =>
        prevComments.map((comment) => (comment.id === savedComment.id ? savedComment : comment))
      )
      setEditCommentModalOpen(false)
    } catch (error) {
      console.error('Failed to update comment', error)
      setErrorMessage('Failed to update comment')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await commentService.remove(commentId)
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId))
      } catch (error) {
        console.error('Failed to delete comment', error)
        setErrorMessage('Failed to delete comment')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle2" mt={2}>
        Comments:
      </Typography>
      {user && (
        <AddComment
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      )}
      {comments.map((comment) => {
        const formattedDate = format(new Date(comment.date), 'dd-MM-yyyy')
        return (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%' }}
          >
            <Paper elevation={1} sx={{ padding: 3, marginTop: 2, width: '100%' }}>
              <Box sx={{ marginBottom: 2 }}>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }}
                />
              </Box>

              {/* Comment metadata section with date and author */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  color: 'text.secondary',
                  marginBottom: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonIcon fontSize="small" />
                  <Typography variant="caption">{comment.user.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon fontSize="small" />
                  <Typography variant="caption">{formattedDate}</Typography>
                </Box>
              </Box>

              <Divider sx={{ marginBottom: 2 }} />

              {/* Action buttons for edit/delete */}
              {(user && (user.role === 'admin' || comment.user.email === user.email)) && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditComment(comment)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </Button>
                </Box>
              )}
            </Paper>
          </motion.div>
        )
      })}
      {editingComment && (
        <EditCommentModal
          open={editCommentModalOpen}
          editingComment={editingComment}
          setEditingComment={setEditingComment}
          handleUpdateComment={handleUpdateComment}
          onClose={() => setEditCommentModalOpen(false)}
        />
      )}
    </Box>
  )
}

export default CommentList
