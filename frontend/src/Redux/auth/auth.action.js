import axios from "axios"
import { FETCH_SIGNUP_ERROR, FETCH_SIGNUP_SUCESS, HIDE_LOADING, SHOW_LOADING, FETCH_LOGIN_SUCESS, FETCH_LOGIN_ERROR, LOGOUT } from './auth.types';
import { production_url,development_url } from "../../Utils/urlLinks";

// let url = `http://localhost:8080`
let url = production_url

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
        // console.log("login",res.data)
        dispatch({type:HIDE_LOADING})
        dispatch({
            type:FETCH_LOGIN_SUCESS,
            payload:res.data.token
        })
    }catch(err){
        // console.log("from catch block",err)
        dispatch({type:HIDE_LOADING})
        dispatch({type:FETCH_LOGIN_ERROR,payload:err.response.data.msg})
    }

}

export const logoutRequest = ()=>{
    return {
        type:LOGOUT
    }
}