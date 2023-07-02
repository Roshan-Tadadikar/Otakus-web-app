import React, { useReducer, useState } from 'react'
import img from "../Images/travel.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { json, useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    
    const handleActions=(state,action)=>{
        switch(action.type){
            case "SET_PAGE":
                return {...state, page:!page}
            case "SET_FULLNAME":
                return {...state, fullName:action.fullName}
            case "SET_USERNAME":
                return {...state, userName:action.userName}
            case "SET_EMAIL":
                return {...state, email:action.email}
            case "SET_PASSWORD":
                return {...state, password:action.password}
            default:
                return state;
        }
    }


    const[state,dispatch] = useReducer(handleActions,{page:true, fullName:"", userName:"", email:"", password:""})
    const[page,setPage] = useState(true)

    const handleScreen=()=>{
      setPage(!page)
    }

    const LogIn=(e)=>{
      e.preventDefault()
      const email=document.querySelector("#email").value;
      const password = document.querySelector("#password").value;
      let validation =true
      const body={
        "username":email,
        "password":password
      }
      if(email.length==0){
        toast.warn("Please enter the username")
      }
      if(password.length==0){
        toast.warn("Please enter the Password")
      }
        if(validation)requestLogin(body)
    }

    const SignUp=(e)=>{
        e.preventDefault();

        const fname=document.querySelector("#fname").value;
        const uname = document.querySelector("#uname").value;
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;

        const body={
            FullName:fname,
            username:uname,
            email:email,
            password:password
        }
       let validation =true
        if(fname.length==0){
            toast.warn("Full Name can't be blank")
           validation=false;
        }
        if(uname.length==0){
            toast.warn("UserName can't be blank")
            validation=false;
        }
        if(email.length==0){
            toast.warn("Email can't be blank")
            validation=false;
        }
        if(password.length==0){
            toast.warn("Password can't be blank")
            validation=false;
        }
        console.log(body)
        if(validation)requestSignUp(body)
    }

    const requestLogin= async(body)=>{
        try{
          const data = await fetch("/api/auth/login",{
            method:"POST",
            body:JSON.stringify(body)
          })
          console.log("response--->"+JSON.stringify(data))
         if(data.status==200){
            const{encodedToken} = await data.json()
            localStorage.setItem("encodedToken",encodedToken)
            localStorage.setItem("userInfo",JSON.stringify(data))
            toast.success("Login SuccessFull");
            navigate("/home")
           
         }else{
            const{errors} = data.json()
            toast.error("Wrong credentials")
         }
        }catch(e){
          console.log(e)
          toast.error("Error while fetching the record")
        }
      }

      const requestSignUp = async(body)=>{
        try{
            const response = await fetch("/api/auth/signup",{
                method:"POST",
                body:JSON.stringify(body)
            })
            console.log(await JSON.stringify(response))
            if(response.status==201){
              localStorage.setItem("encodedToken", response.encodedToken)
              toast.success("SignUp SuccessFull");
            }
            else{
                const{errors} = await response.json()
                toast.error(errors)
            }
        }catch(e){
            toast.error("Error while fetching the record")
        }
      }

      
    const GuestLogIn=(e)=>{
        e.preventDefault();
        document.getElementById("email").value="adarshbalika"
        document.getElementById("password").value="adarshBalika123"
        const body={
            username:"adarshbalika",
            password:"adarshBalika123"
        }

        requestLogin(body)
    }

  return (
    <div>

    {
      page?
      (
<section class="bg-gray-50 dark:bg-gray-900 h-screen">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-12 h-12 mr-2" src={img} alt="logo" />
          Otakus    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Your Username</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Human" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div class="flex items-center justify-between">
                   
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={(e)=>LogIn(e)}>Sign in</button>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={(e)=>GuestLogIn(e)}>Guest Sign In</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={(e)=>handleScreen(e)}>Sign up</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
      )
      :
      (
<section class="bg-gray-50 dark:bg-gray-900 h-screen">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-12 h-12 mr-2" src={img} alt="logo" />
          Otakus    
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign Up to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Full Name</label>
                      <input type="email" name="email" id="fname" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Human Being" required="" />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Username</label>
                      <input type="email" name="email" id="uname" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Human" required="" />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Email Address</label>
                      <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@random.com" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  <div class="flex items-center justify-between">
                   
                      <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={(e)=>SignUp(e)}>Sign Up</button>
              
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                     Already a member? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={()=>handleScreen()}>Sign in</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
      )

    }
        




        <ToastContainer theme="dark" />
    </div>
  )
}

export default Login









