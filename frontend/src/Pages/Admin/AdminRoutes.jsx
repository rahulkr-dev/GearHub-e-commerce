import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './DashboardHeader';
import CustomerList from './CustomerList';
import Customer from './Customer';
import Product from './Product';
import ProductList from './ProductList';

const AdminRoutes = () => {
  return (
    <Routes>
    <Route path="/admin" element={<Dashboard />} />
    <Route path="/admin/customer" element={<Customer />} />
    <Route path="/admin/customer-list" element={<CustomerList />} />
    <Route path="/admin/product-list" element={<ProductList />} />
    <Route path="/admin/product" element={<Product />} />
   </Routes>
  )
}

export default AdminRoutes