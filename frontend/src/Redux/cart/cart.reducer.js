import { CART_ADD_ERROR, CART_HIDE_LOADING, CART_SHOW_LOADING, CART_GET_DATA_SUCESS, CART_ADD_DATA, DELETE_CART_ITEMS_SUCESS } from './cart.types';

const init = {
    loading:false,
    error:null,
    data:[],
    totalPrice:0,
    delivery_fee:49,
    totalQty:0

}

export const cartReducer = (state=init,{type,payload})=>{
    switch(type){
        case CART_SHOW_LOADING :{
            return{
                ...state,
                loading:true
            }
        }
        case CART_HIDE_LOADING :{
            return{
                ...state,
                loading:false
            }
        }
        case CART_ADD_DATA:{
            return{
                ...state,
                loading:false,
                error:null,
                totalQty:state.totalQty+payload

            }
        }
        case CART_GET_DATA_SUCESS:{
            let priceCal = 0;
            let totalQty = 0;
           let val =  payload.map(item=>{
                priceCal+=item.product.price * item.quantity;
                totalQty+=item.quantity
            })
            return{
                ...state,
                loading:false,
                error:null,
                data:payload,
                totalPrice:priceCal,
                totalQty
            }
        }
        case DELETE_CART_ITEMS_SUCESS :{
            // console.log(payload)
            return{
                ...state,
                loading:false,
                error:null,
                totalQty:state.totalQty-payload.quantity
            }
        }
  
        default : return state
    }
}