
import { ADD_PRODUCT_ERROR, ADD_PRODUCT_SUCESS, GET_PRODUCT_ERROR, GET_PRODUCT_SUCESS, ITEM_ADDED_RESET } from './product.types';

const init = {
    error:null,
    itemAdded:false,
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
            }
        }
        case GET_PRODUCT_ERROR : {
            return {
                ...state,
            }
        }

        case ITEM_ADDED_RESET :{
            return {
                ...state,
                itemAdded:false

            }
        }
        default : return state
    }
}