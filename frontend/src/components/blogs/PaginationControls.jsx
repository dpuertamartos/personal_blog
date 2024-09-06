import { Box, Button, Typography } from '@mui/material'
import ArrowRight from '@mui/icons-material/ArrowRight'
import ArrowLeft from '@mui/icons-material/ArrowLeft'

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  handlePreviousPage, 
  handleNextPage, 
  scrollToBlogs, 
  filter, 
  monthNames, 
  onClearFilter, 
  onOpenFilter 
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 3 }}>
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

{filter ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginX: 2 }}>
          <Typography variant="body2" sx={{ color: 'white' }}>
            Showing {monthNames[filter.month]} {filter.year}
          </Typography>
          <Button variant="outlined" color="secondary" onClick={onClearFilter}>
            Clear Filter
          </Button>
        </Box>
      ) : (
        <Button
          variant="outlined"
          onClick={onOpenFilter}
          sx={{
            marginX: 2,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          Open Filter
        </Button>
      )}
    </Box>
  )
}

export default PaginationControls
