import React, { useState,useEffect, useContext } from 'react'
import img from "../Images/travel.png"
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { ProvideContext } from './ContextProvider';

const RightNavbar = () => {
    const{state} = useContext(ProvideContext)
    const{dispatch} = useContext(ProvideContext)
    const userInfoObject = JSON.parse(localStorage.getItem("userInfo"))
    const userInfo =JSON.parse(userInfoObject._bodyInit).foundUser
    console.log("State -->following-->"+state.following)
   
    const[users, loadUsers] = useState([])
    const[unAlteredData, setData]= useState([])
    useEffect(()=>{
        const handleData= async ()=>{
            try{
                 const response = await fetch("/api/users")
                 const userData = await response.json();
                if(response.ok){
                    console.log(JSON.stringify(userData))
                    loadUsers(userData.users.filter(ele=>ele._id!=userInfo._id && state.following.indexOf(ele)==-1))
                    setData(userData.users.filter(ele=>ele._id!=userInfo._id && state.following.indexOf(ele)==-1))
                    // loadUsers(users.filter(ele=>!state.following.includes(ele)))
                }
            }catch(e){
                console.error()
            }
        }
        handleData()
    },[])

    const followUser=(user)=>{
        dispatch({"type":"follow_user", payload:user})
        toast.success(`You're following ${user.username} now`)
        loadUsers(users.filter(ele=>ele.id!=user.id))
    }

    const handleUsers=(event)=>{
        const value = event.target.value;
        console.log("user input--->"+value);
        loadUsers(unAlteredData.filter(ele=>ele.username.includes(value.toLowerCase())))
    }
  return (
    <div className='hidden lg:block'>
<div className=''>
<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-transparent dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="logo-sidebar" class="lg:visible fixed top-0 right-0 z-40 w-96 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-transparent">
    <div>
        <input onChange={(e)=>handleUsers(e)} type='search'  class="mb-8 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border border-primary-300" placeholder='Search users' />
    </div>
    
        {/* <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"> */}



<div class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
   <h1 className='text-white font-bold mb-2'>Suggested Users</h1>
   <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                {
                    users.map(user=><div>

<div class="flex items-center space-x-4 mb-6 mt-6 hover:bg-gray-900 p-4 hover:shadow-xl">
                    <div class="flex-shrink-0" key={user.id}>
                        <img class="w-8 h-8 rounded-full" src={user.img} alt="Neil image" />
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {user.firstName}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                           @{user.username}
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    onClick={()=>followUser(user)}
                    >Follow</button>
                    </div>
                </div>
                    </div>)
                }
           
               
            </li>
        </ul>
   </div>
</div>


        {/* </div> */}
        </div>
</aside>
</div>
<ToastContainer theme="dark" />
    </div>
  )
}

export default RightNavbar