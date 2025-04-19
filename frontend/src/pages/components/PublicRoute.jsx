import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const PublicRoute = ({children}) => {
  const user = useSelector((state) => state.user.user)
  return !user?.role  ? children : <Navigate to={`/${user.role}`}/>
}

export default PublicRoute
