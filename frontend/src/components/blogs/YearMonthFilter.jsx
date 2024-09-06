import { useState } from 'react'
import { Box, List, ListItem, ListItemText, Collapse, Typography, Button } from '@mui/material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

// Mapping numbers to month names
const monthNames = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
}

const YearMonthFilter = ({ yearMonthStats, onFilterSelect, activeFilter, onClearFilter }) => {
  const [openYears, setOpenYears] = useState({})

  // Check if yearMonthStats is valid, i.e., it's an object and not null or undefined
  if (!yearMonthStats || typeof yearMonthStats !== 'object' || Object.keys(yearMonthStats).length === 0) {
    return <Typography>Loading statistics...</Typography>
  }

  const handleYearClick = (year) => {
    setOpenYears((prev) => ({ ...prev, [year]: !prev[year] }))
  }

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>Filter by Year and Month</Typography>
      <List>
        {Object.keys(yearMonthStats).map((year) => (
          <Box key={year}>
            <ListItem button onClick={() => handleYearClick(year)} sx={{ bgcolor: '#f5f5f5', borderRadius: '4px', mb: 1 }}>
              <ListItemText 
                primary={
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {`${year} (${yearMonthStats[year].total || 0})`}
                  </Typography>
                }
              />
              {openYears[year] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openYears[year]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 3 }}>
                {yearMonthStats[year]?.months && Object.keys(yearMonthStats[year].months).map((month) => (
                  <ListItem
                    button
                    key={month}
                    onClick={() => onFilterSelect(year, month)}
                    selected={activeFilter?.year === year && activeFilter?.month == month}
                    sx={{
                      borderRadius: '4px',
                      bgcolor: activeFilter?.year === year && activeFilter?.month == month ? 'primary.light' : 'transparent',
                      color: activeFilter?.year === year && activeFilter?.month == month ? 'white' : 'inherit',
                      mb: 1,
                    }}
                  >
                    <ListItemText primary={`${monthNames[month]} (${yearMonthStats[year].months[month] || 0})`} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
      {activeFilter && (
        <Button variant="contained" color="secondary" onClick={onClearFilter} sx={{ mt: 2 }}>
          Clear Filter
        </Button>
      )}
    </Box>
  )
}

export default YearMonthFilter
