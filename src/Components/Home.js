import React from 'react'
import { Link } from 'react-router-dom'
import LeftNavbar from './LeftNavbar'
import RightNavbar from './RightNavbar'
import Content from './Content'


import { ToastContainer, toast } from 'react-toastify';


const Home = () => {
  
  return (
    <div>
      <LeftNavbar/>
      <Content/>
      <RightNavbar/>
      <ToastContainer theme="dark" />
    </div>
  )
}

export default Home