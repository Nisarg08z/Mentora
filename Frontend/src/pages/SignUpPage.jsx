import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/Firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { signUpUser, signUpWithGoogle } from '../utils/api'

const SignUpPage = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await signUpUser({ name, email, password, role })
            dispatch(setUserData(result))
            navigate('/')
            toast.success('SignUp Successfully')
        } catch (error) {
            console.error(error)
            toast.error(error.message || 'Signup failed')
        } finally {
            setLoading(false)
        }
    }

    const googleSignUp = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            const user = response.user
            const result = await signUpWithGoogle({ name: user.displayName, email: user.email, role })
            dispatch(setUserData(result))
            navigate('/')
            toast.success('SignUp Successfully')
        } catch (error) {
            console.error(error)
            toast.error(error.message || 'Google signup failed')
        }
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center bg-[#f5f5f5] px-4'>
            <form className='w-full max-w-[700px] bg-white shadow-xl rounded-2xl flex flex-col md:flex-row' onSubmit={(e) => e.preventDefault()}>
                {/* Left Section */}
                <div className='md:w-1/2 w-full flex flex-col items-center justify-center gap-4 p-6'>
                    <div className='text-center'>
                        <h1 className='font-semibold text-black text-2xl'>Let's get Started</h1>
                        <h2 className='text-gray-500 text-md'>Create your account</h2>
                    </div>

                    {/* Name */}
                    <div className='w-full'>
                        <label htmlFor="name" className='font-semibold text-sm'>Name</label>
                        <input id='name' type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)} className='mt-1 w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black' />
                    </div>

                    {/* Email */}
                    <div className='w-full'>
                        <label htmlFor="email" className='font-semibold text-sm'>Email</label>
                        <input id='email' type="email" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} className='mt-1 w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black' />
                    </div>

                    {/* Password */}
                    <div className='w-full relative'>
  <label htmlFor="password" className='font-semibold text-sm'>Password</label>
  <div className="relative">
    <input
      id='password'
      type={show ? "text" : "password"}
      placeholder='********'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className='mt-1 w-full h-10 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
    />
    <span
      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
      onClick={() => setShow(prev => !prev)}
    >
      {show ? (
        <MdRemoveRedEye className="w-5 h-5" />
      ) : (
        <MdOutlineRemoveRedEye className="w-5 h-5" />
      )}
    </span>
  </div>
</div>


                    {/* Role Selection */}
                    <div className='flex w-full justify-between'>
                        <span onClick={() => setRole("student")} className={`px-4 py-2 border rounded-full cursor-pointer ${role === 'student' ? 'border-black' : 'border-gray-400'}`}>Student</span>
                        <span onClick={() => setRole("educator")} className={`px-4 py-2 border rounded-full cursor-pointer ${role === 'educator' ? 'border-black' : 'border-gray-400'}`}>Educator</span>
                    </div>

                    {/* Sign Up Button */}
                    <button className='w-full h-10 bg-black text-white rounded-md flex items-center justify-center' disabled={loading} onClick={handleSignUp}>
                        {loading ? <ClipLoader size={25} color='white' /> : "Sign Up"}
                    </button>

                    {/* Divider */}
                    <div className='flex items-center w-full gap-2'>
                        <div className='flex-1 h-px bg-gray-300' />
                        <span className='text-sm text-gray-500'>or continue with</span>
                        <div className='flex-1 h-px bg-gray-300' />
                    </div>

                    {/* Google Button */}
                    <div className='w-full h-10 border border-gray-300 rounded-md flex items-center justify-center gap-2 cursor-pointer' onClick={googleSignUp}>
                        <img src={google} alt="Google" className='w-5' />
                        <span className='text-gray-600 text-sm'>Google</span>
                    </div>

                    {/* Login Link */}
                    <div className='text-sm text-gray-600'>
                        Already have an account?{' '}
                        <span className='underline text-black cursor-pointer' onClick={() => navigate("/login")}>Login</span>
                    </div>
                </div>

                {/* Right Side Logo */}
                <div className='md:w-1/2 hidden md:flex bg-black text-white rounded-r-2xl flex-col items-center justify-center gap-2 p-6'>
                    <img src={logo} className='w-32 shadow-xl' alt="Logo" />
                    <span className='text-xl font-semibold'>VIRTUAL COURSES</span>
                </div>
            </form>
        </div>
    )
}

export default SignUpPage
