import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { motion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

const HeroOverlay = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
}))

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '12px 24px',
  fontSize: '18px',
  fontWeight: 'bold',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  backgroundColor: theme.palette.primary.main,
  transition: 'transform 0.3s, background-color 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    backgroundColor: theme.palette.primary.dark,
  },
  '&:focus': {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}))

const HeroContainer = ({ scrollToBlogs }) => {
  return(
    <Box
      sx={{
        position: 'relative',
        backgroundImage: 'url("/hero1.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        mb: '5%',
        px: '4%',
      }}
    >
      <HeroOverlay />
      <Typography
        variant="h2"
        sx={{
          mb: 2,
          zIndex: 1,
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
        }}
        gutterBottom
      >
        <Typewriter
          words={['Indie Co. Blog']}
          loop={1}
          cursor
          cursorStyle=' >_'
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </Typography>
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          zIndex: 1,
          textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)',
        }}
      >
          Insights and Stories from the point of view of an Indie Developer.
      </Typography>
      <motion.div initial={{ opacity: 0.8, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: 'easeInOut' }}>
        <StyledButton size="large" variant="contained" color="primary" onClick={() => scrollToBlogs('smooth')}>
            Explore Posts
        </StyledButton>
      </motion.div>
    </Box>
  )
}

export default HeroContainer