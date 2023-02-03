
import { ADD_PRODUCT_ERROR, ADD_PRODUCT_SUCESS, GET_PRODUCT_ERROR, GET_PRODUCT_SUCESS, ITEM_ADDED_RESET, DELETE_PRODUCT_SUCESS,DASHBOARD_INFO } from './product.types';

const init = {
    error:null,
    itemAdded:false,
    productCount:0,
    userCount:0,
    data:[]
}
export const adminProductReducer = (state=init,{type,payload})=>{
    switch(type){
        case ADD_PRODUCT_SUCESS : {
            return {
                ...state,
                itemAdded:true
            }
        }
        case ADD_PRODUCT_ERROR : {
            return {
                ...state,
                error:payload
            }
        }
        case GET_PRODUCT_SUCESS : {
            return {
                ...state,
                data:payload,
                totalProduct:payload.length
            }
        }
        case GET_PRODUCT_ERROR : {
            return {
                ...state,
                loading:false,
                error:payload
            }
        }
        case DELETE_PRODUCT_SUCESS:{
            return {
                ...state,
                totalProduct:state.totalProduct-1

            }
        }

        case ITEM_ADDED_RESET :{
            return {
                ...state,
                itemAdded:false

            }
        }
        case DASHBOARD_INFO :{
            return {
                ...state,
                productCount:payload.productCount,
                userCount:payload.userCount,
                orderCount:payload.orderCount
            }
        }
        default : return state
    }
}