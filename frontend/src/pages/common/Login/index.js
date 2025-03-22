import React from 'react'
import {Form, message} from 'antd'
import { Link } from 'react-router-dom'
import { googleLogin, loginUser } from '../../../apicalls/users'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'
import {useGoogleLogin} from "@react-oauth/google"

function LoginPage() {
  const dispatch = useDispatch()
  const onFinish = async(values) => {
    try{
      dispatch(ShowLoading())
      const response = await loginUser(values)
      dispatch(HideLoading())
      if(response.success){
        console.log(response);
        message.success(response.message);
        localStorage.setItem("token",response.data)
        window.location.href="/";
      }
      else{
        message.error(response.message)
      }
    }
    catch(error){
        dispatch(HideLoading())
        message.error(error.message);
    }
  }
  const responseFromGoogle=async (response)=>{
    try{
      if(response.code){
        dispatch(ShowLoading())
        const res=await googleLogin(response.code)
        dispatch(HideLoading())
        if(res.success){
        
        message.success(res.message);
        localStorage.setItem("token",res.data)
        window.location.href="/";
      }
    }
         
    }
    catch(error){
      dispatch(HideLoading())
        message.error(error.message);
    }
  }
    const loginWithGoogle=useGoogleLogin({
      onSuccess:responseFromGoogle,
      onError:responseFromGoogle,
      flow:"auth-code"
    })

  
  return (
    <div className='flex justify-center items-center h-screen w-screen bg-primary'>
     <div className='card w-400 p-3 bg-white'>
       <div className='flex flex-col'>
       <h1 className='text-2xl'>
        Quiz-Portal Login  <i className='ri-login-circle-line'></i>
       </h1>
       <div className='divider'></div>
       <Form layout="vertical" className='mt-2' onFinish={onFinish}>
        <Form.Item name='email' label='Email'>
          <input type="email" placeholder='Enter your email' required/>
        </Form.Item>
        <Form.Item name='password' label='Password'>
          <input type="password" placeholder='Enter your password' required/>
        </Form.Item>
        <div className='flex flex-col gap-2'>
        <button type="submit" className='primary-contained-btn mt-2 w-100'>Login</button>
        <div className='text-blue-500 cursor-pointer' onClick={loginWithGoogle}>Login With Google</div>
        <Link to="/register">
          Don't have an account? Register Here
        </Link>
        </div>
       </Form>
       </div>
     </div>
    </div>
  )
}

export default LoginPage