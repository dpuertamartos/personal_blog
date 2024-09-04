import { useState, useRef } from 'react'
import { Button, TextField } from '@mui/material'
import ReactQuill from 'react-quill' // Import Quill
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import blogService from '../../services/blogs'
import Togglable from '../common/Togglable'

const AddBlog = ({ blogs, setBlogs, setErrorMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' })
  const blogFormRef = useRef()

  // Define toolbar options with additional formatting capabilities
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],  // remove formatting button
      [{ 'color': [] }, { 'background': [] }],  // dropdown with defaults from theme
      [{ 'align': [] }],
    ],
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link', 'image', 'video',
    'color', 'background', 'align'
  ]

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewBlog({ title: '', content: '', author: '' })
    } catch (error) {
      console.error('Failed to add blog', error)
      setErrorMessage('Failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (
    <Togglable buttonLabel='New blog' ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <TextField label="Title" name="title" value={newBlog.title} onChange={handleChange} fullWidth />
        <ReactQuill
          value={newBlog.content}
          onChange={(content) => setNewBlog({ ...newBlog, content })}
          modules={modules}  // Include custom toolbar modules
          formats={formats}  // Include formats to be supported by the editor
        />
        <TextField label="Author" name="author" value={newBlog.author} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary">Add Blog</Button>
      </form>
    </Togglable>
  )
}

export default AddBlog
