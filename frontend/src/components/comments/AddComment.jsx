import { Box, Button } from '@mui/material'
import 'react-quill/dist/quill.snow.css'
import QuillEditor from '../common/QuillEditor'

const AddComment = ({ newComment, setNewComment, handleAddComment }) => {
  return (
    <Box mt={2}>
      <QuillEditor
        value={newComment}
        onChange={setNewComment}
      />
      <Button onClick={handleAddComment} variant="outlined" color="primary" sx={{ mt: 2 }}>
        Add Comment
      </Button>
    </Box>
  )
}

export default AddComment
