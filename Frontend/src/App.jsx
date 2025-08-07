import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux'

import getCurrentUser from './hooks/getCurrentUser'
import getCouseData from './hooks/getCouseData'
import getAllReviews from './hooks/getAllReviews'

import ScrollToTop from './components/ScrollToTop'

import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import SignUp from './pages/SignUpPage'

function App() {

    let { userData } = useSelector(state => state.user)

    getCurrentUser()
    getCouseData()
    getAllReviews()

    return (
        <>
            <ToastContainer />
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />

            </Routes>
        </>
    )
}

export default App
