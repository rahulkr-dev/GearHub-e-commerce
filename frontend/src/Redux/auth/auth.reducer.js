import { FETCH_LOGIN_ERROR, FETCH_SIGNUP_ERROR, HIDE_LOADING, SHOW_LOADING,LOGOUT,FETCH_LOGIN_SUCESS,FETCH_SIGNUP_SUCESS } from "./auth.types"

const init = {
    loading:false,
    error:null,
    signIn:false,
    auth:!!localStorage.getItem('user'),
    token:""
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
                error:null
            }
        }
        case FETCH_SIGNUP_ERROR :{
            return{
                ...state,
                error:payload
            }
        }
        case FETCH_LOGIN_SUCESS :{
            localStorage.setItem('user',payload)
            return{
                ...state,
                auth:true,
                token:payload,
                error:null
            }
        }
        case FETCH_LOGIN_ERROR :{
            return{
                ...state,
               error:payload
            }
        }
        case LOGOUT : {
            localStorage.removeItem('user')
            return{
                ...state,
                auth:false
            }
        }
        default : return state
    }
}