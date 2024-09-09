import { Button } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

const ContactButton = () => {
  return(
    <Button
      variant="outlined"
      startIcon={<MailOutlineIcon />}
      href="mailto:contact@indiecodev.com"
      sx={{ my: 2, textTransform: 'none' }}
    >
          contact@indiecodev.com
    </Button>
  )
}

export default ContactButton