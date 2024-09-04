import { useRef, useCallback, useMemo } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ResizeImage from 'quill-resize-image' // Import the ResizeImage module

// Register the ResizeImage module with Quill
Quill.register('modules/resizeImage', ResizeImage)

const QuillEditor = ({ value, onChange }) => {
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

  return (
    <ReactQuill
      ref={quillRef} // Attach the ref to ReactQuill
      value={value}
      onChange={onChange}
      modules={modules} // Include custom toolbar modules
      formats={formats} // Include formats to be supported by the editor
      theme="snow"
    />
  )
}

export default QuillEditor
