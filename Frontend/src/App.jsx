import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
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

function App() {

    let { userData } = useSelector(state => state.user)

    getCurrentUser()
    getCouseData()
    getAllReviews()
    getCreatorCourseData()

    return (
        <>
            <ToastContainer />
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={!userData ? <Login /> : <Navigate to={"/"} />} />
                <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />

            </Routes>
        </>
    )
}

export default App
