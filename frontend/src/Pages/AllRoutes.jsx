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

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} >
        <Route index element={<LandingPage />} />
        <Route path='products' element={<AllProduct />} />
        <Route path="admin" element={<DashboardHeader />} >
          <Route index element={<Dashboard />} />
          <Route path="/admin/customer" element={<Customer />} />
          <Route path="/admin/customer-list" element={<CustomerList />} />
          <Route path="/admin/product-list" element={<ProductList />} />
          <Route path="/admin/product" element={<Product />} />
        </Route>
      </Route>
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />


      {/* make it private Route and secure */}
      {/* <Route path='/admin' element={<Dashboard />} /> */}
    </Routes>
  )
}

export default AllRoutes