import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import BlogList from '../components/blogs/BlogList'
import ExtraDrawer from '../components/common/ExtraDrawer'
import blogService from '../services/blogs'
import YearMonthFilter from '../components/blogs/YearMonthFilter'

const Home = ({ theme, handleDrawerToggle, drawerOpen, setDrawerOpen, setErrorMessage, handleLoginOpen }) => {
  const [yearMonthStats, setYearMonthStats] = useState({}) // Set initial state to empty object
  const [activeFilter, setActiveFilter] = useState(null)

  useEffect(() => {
    // Fetch blog post stats when the component mounts
    const fetchStats = async () => {
      try {
        const stats = await blogService.getStats()
        setYearMonthStats(stats)
      } catch (error) {
        setErrorMessage('Failed to load blog statistics')
      }
    }

    fetchStats()
  }, [setErrorMessage])

  const handleFilterSelect = (year, month) => {
    setActiveFilter({ year, month })
    setDrawerOpen(false)
  }

  const clearFilter = () => {
    setActiveFilter(null)
  }

  return (
    <Box>
      <ExtraDrawer
        theme={theme}
        handleDrawerToggle={handleDrawerToggle}
        drawerOpen={drawerOpen}
        drawerContent={
          <YearMonthFilter
            yearMonthStats={yearMonthStats}
            onFilterSelect={handleFilterSelect}
            activeFilter={activeFilter}
            onClearFilter={clearFilter}
          />
        }
      />
      <BlogList
        setErrorMessage={setErrorMessage}
        theme={theme}
        filter={activeFilter}
        onClearFilter={clearFilter}
        onOpenFilter={handleDrawerToggle}
        handleLoginOpen={handleLoginOpen}
      />
    </Box>
  )
}

export default Home
