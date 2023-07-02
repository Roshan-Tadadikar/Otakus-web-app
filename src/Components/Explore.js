import React, { useContext, useEffect, useState } from 'react'
import { json, useLocation } from 'react-router-dom'
import LeftNavbar from './LeftNavbar'
import RightNavbar from './RightNavbar'
import Posts from './Posts'
import { ProvideContext } from './ContextProvider'
import travel from "../Images/travel.png"

const Explore = () => {
    const{state} =useContext(ProvideContext)
    const location = useLocation()
    console.log("Location --->"+location.pathname)
    const[data, setData] = useState([])
    useEffect(()=>{
        const handleExploreData= async()=>{
            try{
                const posts= await fetch("/api/posts")
      
                const responseData = await posts.json();
                console.log(responseData)
               
                if(posts.ok){
                    setData( responseData.posts)
                    console.log("explore section-->"+data)
                }
               
            }catch(error){
                console.log(error)
            }
        }
        handleExploreData()
    },[])

   if(location.pathname=="/bookmarks"){
    return (
        <div className='bg-gray-700 h-full'>
            <LeftNavbar/>
            <div class="sm:ml-64">
       <div  class="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 sm:w-8/12 p-2">
        {
            state.bookmark.length>0?
            (state.bookmark)?.map(post=><Posts post={post} />)
            :
            <div>
              <img src={travel} className='mx-auto h-96' />
              <h1 className='text-white'>Oops! No Post Found</h1>
                </div>
          
        }
       
            </div>
            </div>
            <RightNavbar/>
        </div>
      )
   }

  return (
    <div className='bg-gray-700 h-full '>
        <LeftNavbar/>
        <div class="sm:ml-64">
   <div  class="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 sm:w-8/12 p-2">
    {
      (data)?.map(post=><Posts post={post} />)
    }
        </div>
        </div>
        <RightNavbar/>
    </div>
  )
}

export default Explore