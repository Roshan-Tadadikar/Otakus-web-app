import React, { useContext } from 'react'
import img from "../Images/travel.png"
import { Link, useNavigate } from 'react-router-dom'
import { FcAddImage } from 'react-icons/fc';
import { GiSettingsKnobs } from 'react-icons/gi';
import Content from './Content';
import { ProvideContext } from './ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import {CiHome} from "react-icons/ci"
import {BsRocket} from "react-icons/bs"
import {BiBookmarks} from "react-icons/bi"
import {RiLogoutCircleRLine} from "react-icons/ri"

const LeftNavbar = () => {
   const{state} = useContext(ProvideContext)
    const navigate = useNavigate()
    const Logout=()=>{
        console.log("logout clicked")
        localStorage.removeItem("encodedToken");
        localStorage.removeItem("userInfo");
        navigate("/login")
    }

   const userInfoObject = JSON.parse(localStorage.getItem("userInfo"))
   const userInfo =JSON.parse(userInfoObject._bodyInit).foundUser
  
  return (
    <div>
<button data-collapse-toggle="id" data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <a  class="flex items-center pl-2.5 mb-5">
         <img src={img} class="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
         <span class="self-center text-xl font-semibold whitespace-nowrap text-primary-500">Otakus</span>
      </a>
      <div className='h-5/6 flex flex-col justify-between'>
      <ul class="space-y-2 font-medium">
         <li>
            <Link href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-primary-600 text-center" to="/Home">
            <CiHome />Home
            </Link>
         </li>
         <li>
            <Link href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-primary-600" to="/explore">
            <BsRocket/>Explore
            </Link>
         </li>
         <li>
            <Link href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-primary-600" to="/bookmarks">
            <BiBookmarks/> Bookmarks
            </Link>
         </li>
         <li>
            <Link href="#" class="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-primary-600 " onClick={()=>Logout()}>
              <RiLogoutCircleRLine/>Logout
            </Link>
         </li>   

      </ul>
      <div class="flex items-center space-x-4 p-2 hover:bg-primary-600 hover:rounded hover:cursor-pointer" onClick={()=>{
         navigate("/profile")
      }}>
            <img class="w-10 h-10 rounded-full" src={userInfo.img} alt="" />
            <div class="font-medium dark:text-white">
               <div>{userInfo.firstName} {userInfo.lastName}</div>
               <div class="text-sm text-gray-500 dark:text-gray-400">@{state.username==""?userInfo.username:state.username}</div>
            </div>
         </div>
         </div>
   </div>
   
</aside>
<ToastContainer theme="dark" />
    </div>
  )
}

export default LeftNavbar