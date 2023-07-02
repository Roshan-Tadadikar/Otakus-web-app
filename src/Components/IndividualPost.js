import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ProvideContext } from './ContextProvider';
import LeftNavbar from './LeftNavbar';
import RightNavbar from './RightNavbar';
import { RxDotsHorizontal } from "react-icons/rx"

import { AiOutlineHeart } from "react-icons/ai"
import { BiComment } from "react-icons/bi"
import { BsBookmark, BsFillHeartFill, BsBookmarkFill,BsDash } from "react-icons/bs"
import { BsThreeDots } from "react-icons/bs"
import PostModal from './PostModal';


const IndividualPost = () => {
    const { state, dispatch } = useContext(ProvideContext)
    console.log("Dropdown as soon as page loads--->"+state.dropdown)
    const { user } = state.post
    const [post, setPost] = useState();
    const [comments, setComments] = useState([])
    console.log("postId--->" + state.post.postId)
    const userInfoObject = JSON.parse(localStorage.getItem("userInfo"))
    const userInfo = JSON.parse(userInfoObject._bodyInit).foundUser
    useEffect(() => {
        const handlePost = async () => {
            try {
                const response = await fetch(`/api/posts/${state.post.postId}`)
                const data = await response.json()

                if (response.ok) {
                    const arr = state.comment.filter(item => item.postId == state.post.postId);
                    const { values } = arr
                    console.log("inside inidividual post--->"+JSON.stringify(data))
                    setPost(data.post)
                    setComments(data.post.comments)
                }else{
                    console.log("user Post====>"+JSON.stringify(state.post))
                    setPost(state.post.post)
                }
            } catch (e) {
                console.error(e);
            }
        }
        handlePost()
    }, [])

    const handleComments = (comment) => {
        setComments([...comments, comment])
    }

    const editComment=(id)=>{
        
        dispatch({type:"toggle_createPost", payload:true})
        const value = comments.find(ele=>ele.id==id)
        document.getElementById("comment").value=value.comment;
    }

    function generateUniqueNumber() {
        return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
      }

    if (post == null) return <div>
        <LeftNavbar />
        <h1>Ooops! post not found</h1>
        <RightNavbar />
    </div>
    return (
        <div>
            {state.createPost ? <PostModal handleComments={handleComments} /> : ""}
            <div className='bg-gray-700 lg:h-full md:h-full sm:h-screen'>
                <LeftNavbar />
                <div class="sm:ml-64">
                    <div class="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 sm:w-8/12 p-2">
                        <div className='flex flex-col sm:ml-6' key={post._id}>
                            <div className='flex flex-col w-10/12 lg:ml-20 ml-8 mt-8 p-4 shadow-xl bg-gray-900'>
                                <div className='flex w-full'>
                                    <img class="w-10 h-10 rounded-full mr-2" src={user.img} alt="Rounded avatar" />
                                    <p className='flex flex-col'>
                                        <h1 className='text-xl text-white font-bold'>{user.firstName} {post.lastName}</h1>
                                        <span className='text-slate-700'>@{user.username}</span>
                                    </p>
                                    <span className='text-slate-400 ml-4 mt-1 text-sm'> {new Date(user.updatedAt).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</span>
                                    <RxDotsHorizontal className='text-slate-300 lg:ml-40' />
                                </div>
                                <div className='text-white  cursor-pointer'>
                                    {post.content} </div>
                                <div className=' cursor-pointer'>
                                    <img class="h-auto max-w-full mx-auto p-1" src={post.img} />
                                </div>
                                <div className='mt-6 flex lg:w-72 sm:w-48 justify-between  '>
                                    <p>
                                        {
                                            state.likes.includes(user._id) ?
                                                <BsFillHeartFill className='text-red-500 hover:text-red-400 ' onClick={() => {
                                                    dispatch({ type: "add_like", payload: user._id })
                                                    console.log("likes--->" + state.likes)
                                                }} />
                                                :
                                                <AiOutlineHeart className='text-red-500 hover:text-red-400' onClick={() => {
                                                    dispatch({ type: "add_like", payload: user._id })
                                                    console.log("likes--->" + state.likes)
                                                }} />
                                        }
                                    </p>
                                    <p className='flex'><BiComment className='text-blue-500 hover:text-blue-400' onClick={() => dispatch({ type: "toggle_createPost", payload: true })} /><span className='mb-4 text-white text-sm'>{comments?.length}</span></p>
                                    <p>
                                        {state.bookmark.includes(post)
                                            ?
                                            <BsBookmarkFill className='text-green-500 hover:text-green-400 ' onClick={() => dispatch({ type: "bookmark", payload: post })} />
                                            :
                                            <BsBookmark className='text-green-500 hover:text-green-400' onClick={() => dispatch({ type: "bookmark", payload: post })} />
                                        }

                                    </p>
                                </div>
                                <div className='mt-8'>
                                    {
                                        comments?.map(comment =>
                                            <div className='bg-gray-800 flex hover:shadow-xl mb-4'>
                                                <p className='p-2'>
                                                    <img class="w-10 h-10 rounded-full mr-2" src={comment.img} alt="Rounded avatar" />
                                                </p>
                                                <p className='flex flex-col'>
                                                    <h1 className='font-bold text-white flex w-48 justify-between p-2'>{comment.firstName} <span className='font-medium text-sm text-slate-600'>@{comment.username}</span>
                                                        {
                                                            comment.username == userInfo.username ?
                                                                <>
                                                                    <BsThreeDots onClick={() => {
                                                                       dispatch({ type: "open_dropdown", payload:comment.id })
                                                                        console.log("new dropdown --->"+comment.id)
                                                                    }
                                                                } />
                                                                    {console.log("Includes"+state.dropdown.includes(comment.id),comment.id, state.dropdown)}
                                                                   
                                                                            <div style={{display:state.dropdown.includes(comment.id)?"block":"none"}} id="dropdown" class="absolute z-999 ml-4 mt-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                                                    <li className='p-2 text-xl' onClick={()=>dispatch({type:"close_dropdown", payload:comment.id})}><BsDash/></li>
                                                                                    <li>
                                                                                        <a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>editComment(comment.id)}>Edit</a>
                                                                                    </li>
                                                                                    <li onClick={()=>setComments(comments.filter(c=>c.id!=comment.id))}>
                                                                                        <a  class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" >Delete</a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            

                                                                    
                                                                </>

                                                                : ""
                                                        }
                                                    </h1>
                                                    <span className='text-slate-300 p-2'>{comment.comment}</span>
                                                </p>
                                            </div>
                                        )

                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <RightNavbar />
        </div>
    )
}

export default IndividualPost