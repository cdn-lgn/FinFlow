import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import { Box } from '@mui/material'
import { ThemeContext } from '../context/ThemeContext'
import UserDashboard from './components/user/UserDashboard'
import Transactions from './components/user/Transactions'
import Profile from './components/user/Profile'

const User = () => {
  const { colors,selectedOption,setSelectedOption } = useContext(ThemeContext)


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
      {selectedOption==0 && <UserDashboard/>}
      {selectedOption==1 && <Transactions/>}
     {selectedOption==2 && <Profile/>}
      </Box>
  )
}

export default User
