import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#536DFE',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF4081',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1D1D1D',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0BEC5',
    },
    divider: '#373737',
  },
  typography: {
    fontFamily: '"Montserrat", "Roboto", sans-serif',
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
        },
        containedPrimary: {
          backgroundColor: '#536DFE',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#3E53C7',
          },
        },
        outlinedPrimary: {
          borderColor: '#536DFE',
          color: '#536DFE',
          '&:hover': {
            borderColor: '#3E53C7',
            backgroundColor: 'rgba(83, 109, 254, 0.1)',
          },
        },
        outlinedSecondary: {
          borderColor: '#FF4081',
          color: '#FF4081',
          '&:hover': {
            borderColor: '#C51162',
            backgroundColor: 'rgba(255, 64, 129, 0.1)',
          },
        },
      },
    },
  },
})

export default theme
