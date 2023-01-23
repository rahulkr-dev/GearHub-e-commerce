import axios from "axios"
import { FETCH_SIGNUP_ERROR, FETCH_SIGNUP_SUCESS, HIDE_LOADING, SHOW_LOADING, FETCH_LOGIN_SUCESS, FETCH_LOGIN_ERROR } from './auth.types';

let url = `http://localhost:8080`

export const singupRequest = (data)=>async(dispatch)=>{
    try{
        dispatch({type:SHOW_LOADING})
        let res = await axios.post(`${url}/api/user/signup`,data);
        console.log(res)
        dispatch({type:HIDE_LOADING})
        dispatch({
            type:FETCH_SIGNUP_SUCESS
        })
    }catch(err){
        dispatch({type:HIDE_LOADING})
        dispatch({type:FETCH_SIGNUP_ERROR,payload:err.message})
    }

}

export const loginRequest = (data)=>async(dispatch)=>{
    try{
        dispatch({type:SHOW_LOADING})
        let res = await axios.post(`${url}/api/user/login`,data);
        console.log(res)
        dispatch({type:HIDE_LOADING})
        dispatch({
            type:FETCH_LOGIN_SUCESS,
            payload:res.data.token
        })
    }catch(err){
        dispatch({type:HIDE_LOADING})
        dispatch({type:FETCH_LOGIN_ERROR,payload:err.message})
    }

}