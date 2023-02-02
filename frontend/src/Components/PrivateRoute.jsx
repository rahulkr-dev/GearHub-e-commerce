
import React from 'react'
import { useSelector } from 'react-redux';
import {Navigate} from "react-router-dom"
const PrivateRoute = ({children}) => {
  const { auth, role } = useSelector(store => store.auth);
  if(!auth){
    return <Navigate to="/auth/login" />
  }
  return children

}

export default PrivateRoute