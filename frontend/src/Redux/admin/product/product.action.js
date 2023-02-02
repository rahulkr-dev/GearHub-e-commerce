
import axios from 'axios';
import { HIDE_LOADING, SHOW_LOADING } from './../../auth/auth.types';
import { ADD_PRODUCT_ERROR, ADD_PRODUCT_SUCESS, GET_PRODUCT_ERROR, GET_PRODUCT_SUCESS, ITEM_ADDED_RESET,DELETE_PRODUCT_SUCESS, DELETE_PRODUCT_ERROR,DASHBOARD_INFO,DASHBOARD_INFO_ERROR } from './product.types';

const url = `http://localhost:8080/api/product`;
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}
export const addProduct = (productInfo)=>async(dispatch)=>{
    try{
        dispatch({type:SHOW_LOADING})
        let res = await axios.post(`${url}/add`,productInfo,axiosConfig);
        dispatch({type:HIDE_LOADING});
        dispatch({type:ADD_PRODUCT_SUCESS,payload:res.data})

    }catch(err){
        dispatch({type:HIDE_LOADING})
        dispatch({type:ADD_PRODUCT_ERROR,payload:err.message})
    }
}


export const getProduct = ()=>async(dispatch)=>{
    try{
        dispatch({type:SHOW_LOADING})
        let res = await axios.get(`${url}/`,axiosConfig);
        // console.log(res.data)
        dispatch({type:HIDE_LOADING});
        dispatch({type:GET_PRODUCT_SUCESS,payload:res.data})
    }catch(err){
        dispatch({type:HIDE_LOADING});
        dispatch({type:GET_PRODUCT_ERROR,payload:err.message})
    }
}

export const deleteProduct = (productId)=>async(dispatch)=>{
    try{
        dispatch({type:SHOW_LOADING})
        let res = await axios.delete(`${url}/delete/${productId}`,axiosConfig);
        dispatch({type:HIDE_LOADING});
        dispatch({type:DELETE_PRODUCT_SUCESS,payload:res.data})
    }catch(err){
        dispatch({type:HIDE_LOADING});
        dispatch({type:DELETE_PRODUCT_ERROR,payload:err.message})
    }
}

export const getDashboardInfo = ()=>async(dispatch)=>{
    try{
        dispatch({type:SHOW_LOADING})
        let res = await axios.get(`${url}/dashboard-info`,axiosConfig);
      
        dispatch({type:HIDE_LOADING});
        dispatch({type:DASHBOARD_INFO,payload:res.data})
    }catch(err){
        dispatch({type:HIDE_LOADING});
        dispatch({type:DASHBOARD_INFO_ERROR,payload:err.message})
    }
}

export const itemAddedReset = ()=>{
return {
    type:ITEM_ADDED_RESET
}
}

