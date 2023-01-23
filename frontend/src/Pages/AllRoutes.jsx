import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './LandingPage'
import Login from './Login'
import Signup from './Singup'

const AllRoutes = () => {
  return (
   <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/auth/signup" element={<Signup />} />
    <Route path="/auth/login" element={<Login />} />
   </Routes>
  )
}

export default AllRoutes