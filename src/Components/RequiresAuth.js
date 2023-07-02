import React from 'react'
import { useLocation } from 'react-router-dom'
import Login from './Login';

const RequiresAuth = ({children}) => {
  const encodedToken = localStorage.getItem("encodedToken");
    const location = useLocation()
  return (
    encodedToken==undefined?<Login/>:children
  )
}

export default RequiresAuth