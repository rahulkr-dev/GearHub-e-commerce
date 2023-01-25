
import { CUSTOMER_ADDED_RESET, ADD_CUSTOMER_SUCESS, ADD_CUSTOMER_ERROR, GET_CUSTOMER_SUCESS, GET_CUSTOMER_ERROR } from './customer.types';

const init = {
    error:null,
    customerAdded:false,
    data:[]
}
export const adminCustomerReducer = (state=init,{type,payload})=>{
    switch(type){
        case ADD_CUSTOMER_SUCESS : {
            return {
                ...state,
                customerAdded:true
            }
        }
        case ADD_CUSTOMER_ERROR : {
            return {
                ...state,
                error:payload
            }
        }
        case GET_CUSTOMER_SUCESS : {
            return {
                ...state,
                data:payload
            }
        }
        case GET_CUSTOMER_ERROR : {
            return {
                ...state,
            }
        }

        case CUSTOMER_ADDED_RESET :{
            return {
                ...state,
                customerAdded:false

            }
        }
        default : return state
    }
}