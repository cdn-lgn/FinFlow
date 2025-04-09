import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import { Box } from '@mui/material'
import { ThemeContext } from '../context/ThemeContext'

const User = () => {
  const { colors } = useContext(ThemeContext)

  return (
    <Box
      sx={{
        bgcolor: colors.background,
        color: colors.text,
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Sidebar role="user" />
      <h1>hello</h1>
      </Box>
  )
}

export default User
