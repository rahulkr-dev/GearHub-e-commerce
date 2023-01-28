import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Customer from './Admin/Customer'
import CustomerList from './Admin/CustomerList'
import DashboardHeader from './Admin/DashboardHeader'
import Dashboard from './Admin/Dashboard'
import Product from './Admin/Product'
import ProductList from './Admin/ProductList'
import AllProduct from "./AllProduct"
import LandingPage from './LandingPage'
import Login from './Login'
import Signup from './Singup'
import UnauthorizePage from './../Components/Admin/UnauthorizePage';
import PrivateRouteAdmin from '../Components/Admin/PrivateRouteAdmin'
import Men from './Men'
import Women from './Women';
import Kids from './Kids'
import Accessoreis from './Accessoreis'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} >
        <Route index element={<LandingPage />} />
        <Route path='men' element={<Men />} />
        <Route path='women' element={<Women />} />
        <Route path='kids' element={<Kids />} />
        <Route path='accessories' element={<Accessoreis />} />
        <Route path="admin" element={<PrivateRouteAdmin><DashboardHeader /></PrivateRouteAdmin>} >
          <Route index element={<Dashboard />} />
          <Route path="/admin/customer" element={<PrivateRouteAdmin><Customer /></PrivateRouteAdmin>} />
          <Route path="/admin/customer-list" element={<PrivateRouteAdmin><CustomerList /></PrivateRouteAdmin>} />
          <Route path="/admin/product-list" element={<PrivateRouteAdmin><ProductList /></PrivateRouteAdmin>} />
          <Route path="/admin/product" element={<PrivateRouteAdmin><Product /></PrivateRouteAdmin>} />
        </Route>
      </Route>
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/unauthorize" element={<UnauthorizePage />} />


      {/* make it private Route and secure */}
      {/* <Route path='/admin' element={<Dashboard />} /> */}
    </Routes>
  )
}

export default AllRoutes