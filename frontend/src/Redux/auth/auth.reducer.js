import { FETCH_LOGIN_ERROR, FETCH_SIGNUP_ERROR, HIDE_LOADING, SHOW_LOADING,LOGOUT,FETCH_LOGIN_SUCESS,FETCH_SIGNUP_SUCESS } from "./auth.types"
import { fetchDataLOCAL } from "./utils"
import jwt_decode from "jwt-decode";
// const initRole = jwt_decode(localStorage.getItem('token')) 
const init = {
    loading:false,
    error:null,
    signIn:false,
    auth:!!localStorage.getItem('token'),
    token:localStorage.getItem('token') || "",
    role:fetchDataLOCAL("token")?.role
}

export const authReducer = (state=init,{type,payload})=>{
    switch(type){
        case SHOW_LOADING :{
            return{
                ...state,
                loading:true
            }
        }
        case HIDE_LOADING :{
            return{
                ...state,
                loading:false
            }
        }
        case FETCH_SIGNUP_SUCESS :{
            return{
                ...state,
                signIn:true,
                error:null,
                loading:false
            }
        }
        case FETCH_SIGNUP_ERROR :{
            return{
                ...state,
                error:payload
            }
        }
        case FETCH_LOGIN_SUCESS :{
            localStorage.setItem('token',payload);
            let role = jwt_decode(localStorage.getItem('token')).role
            return{
                ...state,
                auth:true,
                token:payload,
                error:null,
                role:role,
                loading:false
            }
        }
        case FETCH_LOGIN_ERROR :{
            return{
                ...state,
               error:payload
            }
        }
        case LOGOUT : {
            localStorage.removeItem('token')
            return{
                ...state,
                auth:false,
                role:""
            }
        }
        default : return state
    }
}