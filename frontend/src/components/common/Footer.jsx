import { Box, Typography ,useTheme } from '@mui/material'

const Footer = () => {
  const theme = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <Box sx={{
      bgcolor: theme.palette.background.paper,  // Use the paper background from the theme
      color: theme.palette.text.secondary,  // Use the secondary text color
      px: 2,
      py: 3,
      textAlign: 'center',
      borderTop: `1px solid ${theme.palette.divider}`, // A top border for subtle separation
      mt: 'auto',
      fontStyle: 'italic',
    }}>
      <Typography variant="body2">
        IndieCo Blog by David Puerta @ {currentYear}
      </Typography>
    </Box>
  )
}

export default Footer