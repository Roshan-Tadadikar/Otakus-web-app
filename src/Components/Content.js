import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { FcAddImage } from 'react-icons/fc';
import { GiSettingsKnobs } from 'react-icons/gi';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from "../backend/utils/authUtils";

import { BsBookmark, BsFillHeartFill, BsBookmarkFill,BsDash } from "react-icons/bs"

import { ToastContainer, toast } from 'react-toastify';
import Posts from './Posts';
import { ProvideContext } from './ContextProvider';
const Content = () => {
  const{dispatch} = useContext(ProvideContext)
  const [image, setImage] = useState([])
  const[openFilter,toggleFilter] = useState(false)
  const userInfoObject = JSON.parse(localStorage.getItem("userInfo"))
  const userInfo = JSON.parse(userInfoObject._bodyInit).foundUser
  const ref = useRef(null)

  const [data, setData] = useState([])
  useEffect(() => {
    const handleExploreData = async () => {
      try {
        const posts = await fetch("/api/posts")

        const responseData = await posts.json();
        console.log(responseData)

        if (posts.ok) {
          setData(responseData.posts)
          console.log("explore section-->" + JSON.stringify(responseData))
        }

      } catch (error) {
        console.log(error)
      }
    }
    handleExploreData()
  }, [])

  const handleImage = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file))
    console.log("image-->"+image)
  }

  const handleIconClick=()=>{
    ref.current.click();
  }

  const addPost=()=>{
    const posts={
    post:{
      _id:uuidv4(),
      content:document.getElementById("message").value,
      createdAt :formatDate(),
      img:image,
      userId:userInfo._id,
    }
  }
    console.log("user post--->"+JSON.stringify(posts))
    setData([...data,posts.post])
    dispatch({type:"add_userPost", payload:posts})
    toast.success("Post added")
  }

  const Filter=(number)=>{
    console.log("Filtered"+number
    )
    switch(number){
      case 1:
        {
          setData(data.sort(function(a,b){
            return new Date(b.createdAt)- new Date(a.createdAt)
          }))
        }
        case 2:
          {
           setData( data.sort(function(a,b){
            return new Date(a.createdAt)- new Date(b.createdAt)
          }))
          }
    }
  }

  return (
    <div className='bg-gray-600'>

      <div class="p-4 sm:ml-64 h-full">
        <div class="p-4 rounded-lg dark:border-gray-700 sm:w-8/12">

          <div class="w-12/12  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 bg-fixed gap-4 mb-4">
            <a className='flex'>
              <img to="/profile" class="w-10 h-10 rounded-full mr-4 mt-4" src={userInfo.img} alt="Rounded avatar" />
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            </a>
            <div className='flex w-full flex-row justify-between'>
              <div className='lg:text-3xl lg:ml-16  sm:ml-8 mt-4 cursor-pointer' >
                <input type='file' accept='image/*' className='hidden' onChange={handleImage}  ref={ref}/>
                <FcAddImage onClick={handleIconClick} />
                </div>
              <a href="#" onClick={addPost} class="self-end px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2 justify-end">
                Post
              </a>

            </div>
          </div>

          <div class="flex items-center justify-center h-16 mb-4 rounded bg-gray-50 dark:bg-gray-900">
            <div class="p-2 lg:w-full">
              <div class="bg-gray-900 rounded flex p-4 h-full text-white justify-between">
                <GiSettingsKnobs className='lg:text-2xl cursor-pointer' onClick={()=>toggleFilter(true)} />
                <span class="title-font font-medium self-start">Latest Post</span>
                {
                  openFilter?
                  <div  id="dropdown" class="absolute z-999 ml-4 mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li className='p-2 text-xl' onClick={()=>toggleFilter(false)}><BsDash/></li>
                      <li>
                          <a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>Filter(1)}>Trending</a>
                      </li>
                      <li onClick={()=>Filter(2)}>
                          <a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >Latest</a>
                      </li>
                  </ul>
              </div>:""
                }
              </div>
            </div>
          </div>
          <div class="mb-4 bg-gray-600">
            <div className='mx-auto'>
              {
                data?.map(post => <Posts post={post} />)
              }
            </div>
          </div>

        </div>
      </div>
      <ToastContainer theme="dark" />
    </div>
  )
}

export default Content