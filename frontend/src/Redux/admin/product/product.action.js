
import axios from 'axios';
import { HIDE_LOADING, SHOW_LOADING } from './../../auth/auth.types';
import { ADD_PRODUCT_ERROR, ADD_PRODUCT_SUCESS, GET_PRODUCT_ERROR, GET_PRODUCT_SUCESS, ITEM_ADDED_RESET } from './product.types';

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
        dispatch({type:HIDE_LOADING});
        dispatch({type:GET_PRODUCT_SUCESS,payload:res.data})
    }catch(err){
        dispatch({type:HIDE_LOADING});
        dispatch({type:GET_PRODUCT_ERROR,payload:err.message})
    }
}

export const itemAddedReset = ()=>{
return {
    type:ITEM_ADDED_RESET
}
}