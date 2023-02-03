
import axios from "axios"
import { ADD_NEW_ADDRESS, ORDER_LOADING_SHOW, ORDER_PLACED_SUCESS, ORDER_LOADING_HIDE,ORDER_PLACED_RESET,GET_PLACED_ORDER } from './order.types';
import { development_url,production_url } from "../../Utils/urlLinks";

let url = `${production_url}/api/order`
// let url = 'http://localhost:8080/api/order'
export const addNewAddress = (payload) => {
    return {
        type: ADD_NEW_ADDRESS,
        payload
    }
}

export const orderPlaced = (payload) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_LOADING_SHOW })
        let res = await axios.post(`${url}/placed`, payload);
        dispatch({
            type: ORDER_PLACED_SUCESS,
            payload: res.data
        })
        dispatch({ type: ORDER_LOADING_HIDE })
    } catch (e) {
        dispatch({ type: ORDER_LOADING_HIDE })

    }
}

export const getPlacedOrder = (token)=>async(dispatch)=>{
    try {
        dispatch({ type: ORDER_LOADING_SHOW })
        let res = await axios.get(`${url}/get-order/${token}`);
        dispatch({
            type: GET_PLACED_ORDER,
            payload: res.data
        })
        dispatch({ type: ORDER_LOADING_HIDE })
    } catch (e) {
        dispatch({ type: ORDER_LOADING_HIDE })

    }
}

export const placeOrderReset = ()=>(
    {type:ORDER_PLACED_RESET}
)