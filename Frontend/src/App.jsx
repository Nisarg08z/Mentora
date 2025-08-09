import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'

import getCurrentUser from './hooks/getCurrentUser'
import getCouseData from './hooks/getCouseData'
import getAllReviews from './hooks/getAllReviews'
import getCreatorCourseData from './hooks/getCreatorCourseData'

import ScrollToTop from './components/ScrollToTop'

import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import SignUp from './pages/SignUpPage'
import ForgotPassword from './pages/ForgotPasswordPage'
import Profile from './pages/ProfilePage'
import EditProfile from './pages/EditProfilePage'
import Dashboard from './pages/DashboardPage'
import Courses from './pages/CoursesPage'
import CreateCourse from './pages/CreateCoursePage'
import AddCourses from './pages/AddCoursesPage'


function App() {
    const { userData, loading } = useSelector(state => state.user)

    getCurrentUser()
    getCouseData()
    getAllReviews()
    getCreatorCourseData()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        )
    }

    return (
        <>
            <ToastContainer />
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={!userData ? <Login /> : <Navigate to={"/"} />} />
                <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
                <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />
                <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} />
                <Route path='/courses' element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />} />
                <Route path='/createcourses' element={userData?.role === "educator" ? <CreateCourse /> : <Navigate to={"/signup"} />} />
                <Route path='/addcourses/:courseId' element={userData?.role === "educator" ? <AddCourses /> : <Navigate to={"/signup"} />} />
            </Routes>
        </>
    )
}

export default App
