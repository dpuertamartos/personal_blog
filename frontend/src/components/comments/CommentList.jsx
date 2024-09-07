import { useState, useEffect } from 'react'
import { Box, Typography, Paper, IconButton, useTheme, Button } from '@mui/material'
import { motion } from 'framer-motion'
import EditCommentModal from './EditCommentModal'
import commentService from '../../services/comments'
import AddComment from './AddComment'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'

const CommentList = ({ blog, user, setErrorMessage, handleLoginOpen }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [editCommentModalOpen, setEditCommentModalOpen] = useState(false)
  const [editingComment, setEditingComment] = useState(null)

  const theme = useTheme()

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

  // Helper function to update vote counts locally
  const updateCommentVote = (commentId, type) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (type === 'like') {
            return { ...comment, likeCount: comment.likeCount + 1 }
          } else if (type === 'dislike') {
            return { ...comment, dislikeCount: comment.dislikeCount + 1 }
          }
        }
        return comment
      })
    )
  }

  // Handling like and dislike votes for comments
  const handleVote = async (commentId, type) => {
    if (!user) {
      setErrorMessage('You must be logged in to vote')
      handleLoginOpen()
      setTimeout(() => setErrorMessage(null), 5000) // Automatically clear error
      return
    }

    try {
      const response = await commentService.vote(commentId, type) // Use service
      updateCommentVote(commentId, type)
      localStorage.setItem(`comment_${commentId}_vote`, type)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error
        const voteType = errorMessage.includes('like') ? 'like' : 'dislike'
        localStorage.setItem(`comment_${commentId}_vote`, voteType) // Update local storage even if already voted
        setErrorMessage(`You have already voted: ${voteType}`)
      } else {
        setErrorMessage('Failed to send vote')
      }
      setTimeout(() => setErrorMessage(null), 5000) // Clear error message after 5 seconds
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
        const vote = localStorage.getItem(`comment_${comment.id}_vote`)
        const isVoted = vote !== null // Check if the user has voted

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

              {/* Comment metadata section with date, author, and vote buttons */}
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

                {/* Like and Dislike Buttons in metadata section */}
                <Box display="flex" gap={2} alignItems="center" sx={{ marginLeft: 'auto' }}>
                  <IconButton
                    onClick={() => handleVote(comment.id, 'like')}
                    sx={{
                      color: vote === 'like' ? 'green' : 'inherit', // Color for the 'like' vote
                      opacity: isVoted ? 0.8 : 1, // Slightly transparent after voting
                      pointerEvents: isVoted ? 'none' : 'auto', // Prevent clicking after vote
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: vote === 'like' ? 'green' : 'transparent', // Subtle highlight
                      },
                    }}
                  >
                    <ThumbUpIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {comment.likeCount}
                    </Typography>
                  </IconButton>

                  <IconButton
                    onClick={() => handleVote(comment.id, 'dislike')}
                    sx={{
                      color: vote === 'dislike' ? 'red' : 'inherit', // Color for the 'dislike' vote
                      opacity: isVoted ? 0.8 : 1, // Slightly transparent after voting
                      pointerEvents: isVoted ? 'none' : 'auto', // Prevent clicking after vote
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: vote === 'dislike' ? 'red' : 'transparent', // Subtle highlight
                      },
                    }}
                  >
                    <ThumbDownIcon />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {comment.dislikeCount}
                    </Typography>
                  </IconButton>
                </Box>
              </Box>

              {/* Action buttons for edit/delete */}
              {(user && (user.role === 'admin' || comment.user.email === user.email)) && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditComment(comment)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
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
