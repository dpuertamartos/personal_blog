import { Box, Modal, Typography, Button, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import QuillEditor from '../common/QuillEditor'

const EditCommentModal = ({ open, editingComment, setEditingComment, handleUpdateComment, onClose }) => {
  const handleCommentEditChange = (content) => {
    setEditingComment((prevComment) => ({
      ...prevComment,
      content,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    handleUpdateComment(editingComment)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '85%',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Typography variant="h6" mb={2}>
            Edit Comment
          </Typography>
          <form onSubmit={handleSubmit}>
            <QuillEditor
              value={editingComment.content}
              onChange={handleCommentEditChange}
              allowImages={false}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Save Changes
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Modal>
  )
}

export default EditCommentModal
