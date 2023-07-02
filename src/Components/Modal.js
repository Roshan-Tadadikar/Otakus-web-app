import React, { useContext } from 'react'
 import { MdOutlineCancel } from 'react-icons/md';
import ContextProvider, { ProvideContext } from './ContextProvider';
import { ToastContainer, toast } from 'react-toastify';

const Modal = () => {
    const userInfoObject = JSON.parse(localStorage.getItem("userInfo"))
    const userInfo =JSON.parse(userInfoObject._bodyInit).foundUser
    const {state,dispatch} = useContext(ProvideContext)

    const saveUserData=()=>{
        const uname = document.querySelector("#username").value
        const newBio =  document.querySelector("#bio").value

        console.log(uname)
        
        dispatch({type:"set_username", payload:uname})
        dispatch({type:"set_bio", payload:newBio})
        dispatch({type:"toggle_modal", payload:false})
        toast.success("Profile Updated!")
        
    }
  return (
    <div>

<div class=" fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full mx-auto bg-slate    ">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={()=>dispatch({type:"toggle_modal", payload:false})}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update Your Profile</h3>
                <form class="space-y-6" action="#">
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input type="name" name="email" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required defaultValue={state.username==""?userInfo.username:state.username}/>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Bio</label>
                        <input name="bio" id="bio"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" defaultValue={state.bio==""?userInfo.about:state.bio} required />
                    </div>
                   
                    <button  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>saveUserData()}>Save </button>
                   
                </form>
            </div>
        </div>
    </div>
</div> 

<ToastContainer />
    </div>
  )
}

export default Modal