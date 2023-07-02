import React, { useContext, useEffect, useReducer, useState } from 'react'
import LeftNavbar from './LeftNavbar'
import Modal from './Modal'
import ContextProvider, { ProvideContext } from './ContextProvider'
import { ToastContainer, toast } from 'react-toastify';
import Posts from './Posts';
import RightNavbar from './RightNavbar';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  const data = location.state?.value
  console.log("userprofile value=====>"+JSON.stringify(data))
    const{state,dispatch} = useContext(ProvideContext)
    const userInfoObject = JSON.parse(localStorage.getItem("userInfo"))
   const userInfo =location.pathname=='/userprofile'?data:JSON.parse(userInfoObject._bodyInit).foundUser
   const[following,setFollowing] = useState(false)

   const toggleModal=()=>{
    dispatch({type:"toggle_modal", payload:true})
   }

   const FollowUser =()=>{
    console.log("Follow user")
      dispatch({type:"follow", payload:data})
      toast.success(`You're following ${data.username}`)
      setFollowing(true)
   }

   const UnFollowUser=()=>{
    dispatch({type:"unfollow", payload:data})
    setFollowing(false)
    toast.success(`You unfollowed ${data.username}`)
   }
  return (
    <div>
        
        {state.showModal?<Modal />:""}
        <div className={state.showModal?'blur-lg':""}>
        <LeftNavbar/>
<section class="text-gray-400 bg-gray-900 body-font lg:ml-64 ">
  <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div class="lg:max-w-lg lg:w-5/6 md:w-1/2 w-8/12 md:mb-0 mb-10">
      <img class="object-cover object-center rounded-3xl" alt="hero" src={userInfo.img} />
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">{userInfo.firstName} {userInfo.lastName}
      <br/>
       <span className='text-lg text-slate-600'>@{state.username==""?userInfo.username:state.username}</span>
      </h1>
      <p class="mb-8 leading-relaxed">{state.bio==""?userInfo.about:state.bio} </p>
      <section class="text-gray-400 bg-gray-900 body-font">
  <div class="container px-5 py-8 mx-auto">
    <div class="flex flex-wrap -m-4 text-center">
      <div class="p-4 sm:w-1/4 w-1/2 ml-4">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{state.followers.length}</h2>
        <p class="leading-relaxed">Followers</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2 ml-4">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{state.following.length}</h2>
        <p class="leading-relaxed">Following</p>
      </div>
      <div class="p-4 sm:w-1/4 w-1/2 ml-4">
        <h2 class="title-font font-medium sm:text-4xl text-3xl text-white">{location.pathname=='/userprofile'?data.posts :state.userPost.length}</h2>
        <p class="leading-relaxed">Posts</p>
      </div>
      
    </div>
  </div>
</section>
      <div class="flex justify-center">
        {location.pathname=='/userprofile'?
         following?
         <button class="inline-flex text-white bg-primary-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>UnFollowUser()}>Following</button>
 
         :<button class="inline-flex text-white bg-primary-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>FollowUser()}>Follow</button>
    :
    <button class="inline-flex text-white bg-primary-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={()=>toggleModal()}>Edit</button>
       
      }
            </div>
    </div>
  </div>
</section>
<div className='bg-gray-700 h-full '>
        <LeftNavbar/>
        <div class="sm:ml-64">
   <div  class="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 sm:w-8/12 p-2">
    {
      (state.userPost)?.map(post=><Posts post={post} />)
    }
        </div>
        </div>
    </div>
</div>
<ToastContainer theme="dark" />
    </div>
  )
}

export default Profile