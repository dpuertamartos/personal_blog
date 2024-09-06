import React from 'react'
import { Button, Box, Typography, Grid, Paper, List, ListItem, ListItemText, Divider, useTheme, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import ContactButton from '../components/common/ContactButton'

const Contact = () => {
  const faqs = [
    { question: 'What is this blog about?', answer: 'This blog shares insights, tutorials, and stories related to software development and indie entrepreneurship' },
    { question: 'How often is content posted?', answer: 'New articles are posted every week, covering a range of technical topics and personal experiences in the software industry.' }
  ]

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box sx={{
      flexGrow: 1,
      backgroundImage: 'url("hero2.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // use minHeight instead of height
      color: 'text.primary',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      p: isSmallScreen ? 2 : 4, // responsive padding
    }}>
      <Grid container spacing={isSmallScreen ? 2 : 3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{
            p: isSmallScreen ? 2 : 4, // responsive padding
            bgcolor: 'background.paper',
            opacity: 0.95,
            overflow: 'auto', // allow scrolling within Paper if content overflows
            mb: isSmallScreen ? 2 : 0, // add bottom margin on small screens
          }}>
            <Typography variant="h6" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>About the Blog</Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
              This website is a platform to share knowledge, tips, and stories from the world of software development and indie development. The blog aims to provide tutorials, project experiences, and personal insights that can help fellow developers on their journey.
              <br />
              <br />
              Whether you're into coding, data, or simply exploring the startup life, you'll find something useful here.
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom color="text.primary" sx={{ fontWeight: 'bold' }}>About Me</Typography>
            <Typography variant="body1" sx={{ textAlign: 'justify' }}>
              My name is David, and I'm passionate about software development and data engineering. After working in research, I transitioned into software development. This blog is a way for me to share what I learn along the way.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{
            p: isSmallScreen ? 2 : 4, // responsive padding
            bgcolor: 'background.paper',
            opacity: 0.95,
            overflow: 'auto', // allow scrolling within Paper if content overflows
          }}>
            <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>Frequently Asked Questions</Typography>
            <List>
              {faqs.map((faq, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={<Typography color="text.primary" sx={{ fontWeight: 'bold' }}>{faq.question}</Typography>}
                      secondary={faq.answer}
                    />
                  </ListItem>
                  {index !== faqs.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
            <Button variant="outlined" color="secondary" component={Link} to="/privacy_policy">
              View Privacy Policy
            </Button>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h5" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>Contact Information</Typography>
            <ContactButton />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact
