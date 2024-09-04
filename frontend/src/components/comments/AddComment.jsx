import { Box, Button } from '@mui/material'
import ReactQuill from 'react-quill' // Import Quill
import 'react-quill/dist/quill.snow.css' // Import Quill styles

const AddComment = ({ newComment, setNewComment, handleAddComment }) => {
  // Quill modules and formats
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link' ],
      ['clean'],  // remove formatting button
      [{ 'color': [] }, { 'background': [] }],  // dropdown with defaults from theme
      [{ 'align': [] }],
    ],
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'list', 'bullet', 'link',
    'color', 'background', 'align'
  ]

  return (
    <Box mt={2}>
      <ReactQuill
        value={newComment}
        onChange={setNewComment}
        modules={modules}
        formats={formats}
        theme="snow" // Snow is a basic Quill theme
      />
      <Button onClick={handleAddComment} variant="outlined" color="primary" sx={{ mt: 2 }}>
        Add Comment
      </Button>
    </Box>
  )
}

export default AddComment
