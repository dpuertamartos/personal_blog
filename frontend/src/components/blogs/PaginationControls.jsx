import { Box, Button, Typography } from '@mui/material'
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'


const PaginationControls = ({ currentPage, totalPages, handlePreviousPage, handleNextPage, scrollToBlogs }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
      <Button
        variant="contained"
        onClick={() => {
          handlePreviousPage()
          scrollToBlogs('auto')  // No smooth scroll on pagination
        }}
        disabled={currentPage === 1}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
        startIcon={<ArrowLeft />}
      />
      <Typography sx={{ marginX: 2 }}>
        {currentPage} of {totalPages}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          handleNextPage()
          scrollToBlogs('auto')  // No smooth scroll on pagination
        }}
        disabled={currentPage === totalPages}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
        }}
        endIcon={<ArrowRight />}
      />
    </Box>
  )
}

export default PaginationControls