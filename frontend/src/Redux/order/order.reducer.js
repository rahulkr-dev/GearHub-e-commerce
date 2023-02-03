
import { ADD_NEW_ADDRESS, ORDER_LOADING_SHOW, ORDER_PLACED_SUCESS, ORDER_LOADING_HIDE,ORDER_PLACED_RESET,GET_PLACED_ORDER } from './order.types';
const init = {
    loading:false,
    error:null,
    address:{},
    products:[],
    paymentMode:"",
    orderPlace:false,
    totalOrderData:[]


}
export const orderReducer = (state=init,{type,payload})=>{
    switch(type){
        case ADD_NEW_ADDRESS : {
            return {
                ...state,
                address:payload
            }
        }
        case ORDER_LOADING_SHOW :{
            return {
                ...state,
                loading:true,
                error:null
            }
        }
        case ORDER_LOADING_HIDE :{
            return {
                ...state,
                loading:false,
                error:null
            }
        }
        case ORDER_PLACED_SUCESS : {
            return {
                ...state,
                loading:false,
                error:null,
                orderPlace:true
            }
        }
        case ORDER_PLACED_RESET : {
            return {
                ...state,
                orderPlace:false
            }
        }
        case GET_PLACED_ORDER : {
            return {
                ...state,
                totalOrderData:payload
            }
        }
        default : return state
    }
}