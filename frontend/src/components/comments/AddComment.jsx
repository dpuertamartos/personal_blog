import { Box, Button, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import 'react-quill/dist/quill.snow.css'
import QuillEditor from '../common/QuillEditor'

const AddComment = ({ newComment, setNewComment, handleAddComment }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <QuillEditor
          value={newComment}
          onChange={setNewComment}
          allowImages={false}
        />
        <Button 
          onClick={handleAddComment} 
          variant="contained" 
          color="primary" 
          sx={{ marginTop: 2 }}
        >
          Add Comment
        </Button>
      </Paper>
    </motion.div>
  )
}

export default AddComment
