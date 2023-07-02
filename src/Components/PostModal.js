import React, { useContext } from 'react'
import { ProvideContext } from './ContextProvider'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';

function generateUniqueNumber() {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  }
const PostModal = ({handleComments,editComments}) => {
    const{state,dispatch} = useContext(ProvideContext)
    const userInfoObject = JSON.parse(localStorage.getItem("userInfo"))
    const userInfo =JSON.parse(userInfoObject._bodyInit).foundUser
    const arr =state.comment.filter(ele=>ele.postId==state.post.postId)
    // console.log("arr--->"+JSON.stringify(arr[0].values))
    // handleComments(
    //     arr[0].values
    // )

    const postData=(e)=>{
        e.preventDefault();
        const uuid = uuidv4()
        const comment = document.getElementById("comment").value;
        dispatch({
            type:"add_comment", payload: {"postId":state.post.postId,
            values:{
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            username: userInfo.username,
            comment:comment,
            img:userInfo.img    
        }}
        })
        dispatch({type:"toggle_createPost", payload:false})
        handleComments({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            username: userInfo.username,
            comment:comment,
            img:userInfo.img,
            id:generateUniqueNumber()  
        })
        console.log("comments added --->"+JSON.stringify(state.comment))
        toast.success("comment added")
    }


    const editData=(e)=>{
        e.preventDefault();
        dispatch({type:"toggle_createPost", payload:false})
       editComments({
        
       })
        console.log("comments added --->"+JSON.stringify(state.comment))
        toast.success("comment added")
    }
  return (
    <div>
<div class="fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full mx-auto bg-slate    ">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={()=>dispatch({type:"toggle_createPost", payload:false})}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add a comment</h3>
                <form class="space-y-6" action="#">
                    <div>
                    <img class="w-10 h-10 rounded-full mr-2 lg:ml-40 ml-28 mb-2 mt-2" src={userInfo.img}  alt="Rounded avatar"/>
                        <input type="name" name="email" id="comment" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="what's on your mind" required/>
                    </div>
                
                    <button  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e)=>state.allowToEdit?editData(e):postData(e)}>Post </button>
                   
                </form>
            </div>
        </div>
    </div>
</div> 
    </div>
  )
}

export default PostModal