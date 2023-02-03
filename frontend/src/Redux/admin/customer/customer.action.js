
import axios from 'axios';
import { HIDE_LOADING, SHOW_LOADING } from './../../auth/auth.types';
import { CUSTOMER_ADDED_RESET, ADD_CUSTOMER_SUCESS, ADD_CUSTOMER_ERROR, GET_CUSTOMER_SUCESS, GET_CUSTOMER_ERROR } from './customer.types';
import { production_url,development_url } from '../../../Utils/urlLinks';

// const url = `http://localhost:8080/api/user/alluser`;
const url = `${production_url}/api/user/alluser`
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }
}
export const addCustomer = (productInfo)=>async(dispatch)=>{
    try{
        dispatch({type:SHOW_LOADING})
        let res = await axios.post(`${url}/add`,productInfo,axiosConfig);
        dispatch({type:HIDE_LOADING});
        dispatch({type:ADD_CUSTOMER_SUCESS,payload:res.data})

    }catch(err){
        dispatch({type:HIDE_LOADING})
        dispatch({type:ADD_CUSTOMER_ERROR,payload:err.message})
    }
}


export const getCustomer = ()=>async(dispatch)=>{
    try{
        dispatch({type:SHOW_LOADING})
        let res = await axios.get(`${url}`,axiosConfig);
        dispatch({type:HIDE_LOADING});
        dispatch({type:GET_CUSTOMER_SUCESS,payload:res.data})
    }catch(err){
        dispatch({type:HIDE_LOADING});
        dispatch({type:GET_CUSTOMER_ERROR,payload:err.message})
    }
}

export const customerAddedReset = ()=>{
return {
    type:CUSTOMER_ADDED_RESET
}
}