import { useState } from 'react'
import { IconButton, Box, Menu, MenuItem } from '@mui/material'
import {
  EmailShareButton, FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton,
  EmailIcon, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon
} from 'react-share'
import ShareIcon from '@mui/icons-material/Share'

const ShareMenu = ({ title = 'IndieCo Blog', url = 'https://indieco.blog', description = 'Insights and stories from an indie developer' }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: url,
      }).catch((error) => console.log('Error sharing', error))
    } else {
      alert('Your browser does not support the native share functionality.')
    }
    handleClose()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 'auto' }}>
      <IconButton color="inherit" onClick={handleShareClick}>
        <ShareIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <FacebookShareButton url={url} hashtag={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </MenuItem>
        <MenuItem>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </MenuItem>
        <MenuItem>
          <LinkedinShareButton url={url} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </MenuItem>
        <MenuItem>
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </MenuItem>
        <MenuItem>
          <EmailShareButton subject={`I am sharing your ${url} , ${title}`} body={`${description} ${url}`}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </MenuItem>
        {navigator.share && (
          <MenuItem onClick={handleNativeShare}>
            <ShareIcon sx={{ marginRight: 1 }} /> Share via Native Apps
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}

export default ShareMenu
