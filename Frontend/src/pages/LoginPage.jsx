import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { loginUser, googleAuth } from '../utils/api';

const LoginPage = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    let [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    let dispatch = useDispatch()

    const handleLogin = async () => {
        setLoading(true);
        try {
            const result = await loginUser({ email, password });
            dispatch(setUserData(result));
            navigate('/');
            toast.success("Login Successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const user = response.user;
            const name = user.displayName;
            const email = user.email;
            const role = "";

            const result = await googleAuth({ name, email, role });
            dispatch(setUserData(result));
            navigate("/");
            toast.success("Login Successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Google login failed");
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-[#f5f5f5] px-4">
        <form
            className="w-full max-w-[700px] bg-white shadow-xl rounded-2xl flex flex-col md:flex-row"
            onSubmit={(e) => e.preventDefault()}
        >
            {/* Left Side - Form */}
            <div className="md:w-1/2 w-full flex flex-col items-center justify-center gap-4 p-6">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-black">Welcome back</h1>
                    <h2 className="text-gray-500 text-md">Login to your account</h2>
                </div>

                {/* Email */}
                <div className="w-full">
                    <label htmlFor="email" className="font-semibold text-sm">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full h-10 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* Password */}
                <div className="w-full">
  <label htmlFor="password" className="font-semibold text-sm">
    Password
  </label>

  <div className="relative">
    <input
      id="password"
      type={show ? "text" : "password"}
      placeholder="********"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="mt-1 w-full h-10 px-4 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
    />

    <span
      onClick={() => setShow((prev) => !prev)}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
    >
      {show ? (
        <MdRemoveRedEye className="w-5 h-5" />
      ) : (
        <MdOutlineRemoveRedEye className="w-5 h-5" />
      )}
    </span>
  </div>
</div>


                {/* Login Button */}
                <button
                    className="w-full h-10 bg-black text-white rounded-md flex items-center justify-center"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? <ClipLoader size={25} color="white" /> : "Login"}
                </button>

                {/* Forgot Password */}
                <span
                    className="text-sm text-gray-600 cursor-pointer"
                    onClick={() => navigate("/forgotpassword")}
                >
                    Forgot your password?
                </span>

                {/* Divider */}
                <div className="flex items-center w-full gap-2">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="text-sm text-gray-500">or continue with</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* Google Login */}
                <div
                    className="w-full h-10 border border-gray-300 rounded-md flex items-center justify-center gap-2 cursor-pointer"
                    onClick={googleLogin}
                >
                    <img src={google} alt="Google" className="w-5" />
                    <span className="text-gray-600 text-sm">Google</span>
                </div>

                {/* Signup Link */}
                <div className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <span
                        className="underline text-black cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </div>
            </div>

            {/* Right Side - Logo Panel */}
            <div className="w-1/2 hidden md:flex bg-black text-white rounded-r-2xl flex-col items-center justify-center gap-2 p-6">
                <img src={logo} className="w-32 shadow-xl" alt="Logo" />
                <span className="text-xl font-semibold">VIRTUAL COURSES</span>
            </div>
        </form>
        </div>

    )
}

export default LoginPage
