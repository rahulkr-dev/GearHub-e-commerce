import React, { useRef, useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouteAdmin = ({children}) => {
    const {role,auth} = useSelector(store=>store.auth)
    if(auth && role==='admin'){
        return children
    }else{
        return <Navigate to="/unauthorize" />
    }
}

export default PrivateRouteAdmin