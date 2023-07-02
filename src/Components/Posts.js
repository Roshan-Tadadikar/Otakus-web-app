import React, { useContext } from 'react'
import { RxDotsHorizontal } from "react-icons/rx"

import { AiOutlineHeart } from "react-icons/ai"
import { BiComment } from "react-icons/bi"
import { BsBookmark, BsFillHeartFill, BsBookmarkFill } from "react-icons/bs"
import { useState, useEffect } from 'react'
import { Navigate, useLocation, useNavigate,Link } from 'react-router-dom'
import { ProvideContext } from './ContextProvider'

const Posts = (posts) => {
  
  console.log("posts---->" + JSON.stringify(posts))
  console.log("posts---->" + posts.post.userId)
  const { state, dispatch } = useContext(ProvideContext)
  const location = useLocation()
  const post = location.pathname=='/profile'?posts.post.post:posts.post;
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const[forProfile, setProfile] = useState(false)
  const userInfoObject = JSON.parse(localStorage.getItem("userInfo"))
  const userInfo =JSON.parse(userInfoObject._bodyInit).foundUser
  useEffect(() => {
    const handleExploreData = async () => {
      try {
        const users = await fetch(`/api/users/${post.userId}`)
        const responseData = await users.json();
        console.log("responseData--->" + JSON.stringify(responseData))
        if (users.ok) {
          setUser(responseData.user)
        }
        
  if(location.pathname=="/profile")setProfile(true)
        if(location.pathname=='/profile'){
          console.log("Insid posts----- for profile--->"+JSON.stringify(posts))
          setUser(posts.post.post)
        }

      } catch (error) {
        console.log(error)
      }
    }
    handleExploreData()
  }, [])

 

  return (
    <div className='flex flex-col sm:ml-6' key={forProfile?userInfo._id:user._id}>
      <div className='flex flex-col w-10/12 lg:ml-20 ml-8 mt-8 p-4 shadow-xl bg-gray-900'>
        <div className='flex w-full'>
         <Link to="/userprofile" state={{
              value:user
            }} > <img class="w-10 h-10 rounded-full mr-2" src={forProfile?userInfo.img:user.img} alt="Rounded avatar" />
          </Link>
          <p className='flex flex-col'>
            <h1 className='text-xl text-white font-bold'>{forProfile?userInfo.firstName:user.firstName} {forProfile?userInfo.lastName:user.lastName}</h1>
            <span className='text-slate-700'>@{forProfile?userInfo.username:user.username}</span>
          </p>
          <span className='text-slate-400 ml-4 mt-1 text-sm'> {new Date(forProfile?user.createdAt:user.updatedAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</span>
          <RxDotsHorizontal className='text-slate-300 lg:ml-40' />
        </div>
        <div className='text-white  cursor-pointer' onClick={() => {
          console.log("clicked on post")
          navigate("/post")
          dispatch({
            type: "set_post", payload: {
              postId: post._id,
              user: user,
              post:post
            }
          })
          console.log("post----->" + state.post)
        }} >
          {post.content} </div>
        <div className=' cursor-pointer' onClick={() => {
          console.log("clicked on post")
          navigate("/post")
          dispatch({
            type: "set_post", payload: {
              postId: post._id,
              user: user,
              post:post
            }
          })
          console.log("post----->" + state.post)
        }}>
          <img class="h-auto max-w-full mx-auto p-1" src={post.img} />
        </div>
        <div className='mt-6 flex lg:w-72 sm:w-48 justify-between'>
          {
            state.likes.includes(forProfile?userInfo._id:user._id) ?
              <BsFillHeartFill className='text-red-500 hover:text-red-400 ' onClick={() => {
                dispatch({ type: "add_like", payload: forProfile?userInfo._id:user._id })
                console.log("likes--->" + state.likes)
              }} />
              :
              <AiOutlineHeart className='text-red-500 hover:text-red-400' onClick={() => {
                dispatch({ type: "add_like", payload: forProfile?userInfo._id:user._id  })
                console.log("likes--->" + state.likes)
              }} />
          }

<p className='flex'><BiComment className='text-blue-500 hover:text-blue-400' onClick={() => dispatch({ type: "toggle_createPost", payload: true })} /><span className='mb-4 text-white text-sm'>{post.comments?.length}</span></p>

          <p>
            {state.bookmark.includes(post)
              ?
              <BsBookmarkFill className='text-green-500 hover:text-green-400 ' onClick={() => dispatch({ type: "bookmark", payload: post })} />
              :
              <BsBookmark className='text-green-500 hover:text-green-400' onClick={() => dispatch({ type: "bookmark", payload: post })} />
            }

          </p>
        </div>

      </div>
    </div>

  )
}

export default Posts