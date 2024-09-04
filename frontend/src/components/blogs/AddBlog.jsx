import { useState, useRef, useCallback, useMemo } from 'react'
import { Button, TextField } from '@mui/material'
import ReactQuill, { Quill } from 'react-quill' // Import Quill
import 'react-quill/dist/quill.snow.css' // Import Quill styles
import blogService from '../../services/blogs'
import Togglable from '../common/Togglable'
import ResizeImage from 'quill-resize-image' // Import the ResizeImage module

Quill.register('modules/resizeImage', ResizeImage) // Register the module with Quill

const AddBlog = ({ blogs, setBlogs, setErrorMessage }) => {
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' })
  const blogFormRef = useRef()
  const quillRef = useRef(null) // Initialize the quillRef with useRef

  const imageHandler = useCallback(() => {
    const editor = quillRef.current.getEditor() // Use quillRef to get editor instance
    const tooltip = editor.theme.tooltip
    const originalSave = tooltip.save
    const originalHide = tooltip.hide

    tooltip.save = () => {
      const range = editor.getSelection(true)
      const value = tooltip.textbox.value
      if (value) {
        editor.insertEmbed(range.index, 'image', value, 'user')
      }
    }

    tooltip.hide = () => {
      tooltip.save = originalSave
      tooltip.hide = originalHide
      tooltip.hide()
    }

    tooltip.edit('image')
    tooltip.textbox.placeholder = 'Embed URL'
  }, [])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          ['clean'], // remove formatting button
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }] // Custom button for the image handler
        ],
        handlers: {
          image: imageHandler, // Use the updated image handler
        },
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
      },
      resizeImage: { // Add resizeImage module configuration
        modules: ['ResizeImage'], // List of modules to include (only 'ResizeImage' in this case)
        handleStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white',
        },
        minWidth: 20,
        minHeight: 20,
        maxWidth: 800,
        maxHeight: 800,
      },
    }),
    [imageHandler]
  )

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'link', 'image', 'video',
    'color', 'background', 'align',
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
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <TextField label="Title" name="title" value={newBlog.title} onChange={handleChange} fullWidth />
        <ReactQuill
          ref={quillRef} // Attach the ref to ReactQuill
          value={newBlog.content}
          onChange={(content) => setNewBlog({ ...newBlog, content })}
          modules={modules} // Include custom toolbar modules
          formats={formats} // Include formats to be supported by the editor
          theme="snow"
        />
        <TextField label="Author" name="author" value={newBlog.author} onChange={handleChange} fullWidth />
        <Button type="submit" variant="contained" color="primary">
          Add Blog
        </Button>
      </form>
    </Togglable>
  )
}

export default AddBlog
