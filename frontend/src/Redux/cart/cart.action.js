
import axios from "axios"
import { CART_ADD_ERROR, CART_HIDE_LOADING, CART_SHOW_LOADING, CART_GET_DATA_SUCESS,CART_ADD_DATA,DELETE_CART_ITEMS_SUCESS,DELETE_CART_ITEMS_ERROR } from './cart.types';
let url = `http://localhost:8080/api/cart`

export const addToCart = ({token,body})=>async(dispatch)=>{
    try{
        dispatch({type:CART_SHOW_LOADING});
        // console.log(token)
        let res = await axios.patch(`${url}/${token}/add`,body);
        // console.log(res.data)
        dispatch({type:CART_HIDE_LOADING})
        dispatch({type:CART_ADD_DATA,payload:body.productQty})
    }catch(err){
        dispatch({type:CART_HIDE_LOADING})
        dispatch({type:CART_ADD_ERROR,payload:err.message})

    }
}

export const getCartData = ({token})=>async(dispatch)=>{
    try{
        dispatch({type:CART_SHOW_LOADING});

        let res = await axios.get(`${url}/${token}`);
     
        dispatch({type:CART_HIDE_LOADING})
        dispatch({type:CART_GET_DATA_SUCESS,payload:res.data.items})
    }catch(err){
        dispatch({type:CART_HIDE_LOADING})
        dispatch({type:CART_ADD_ERROR,payload:err.message})

    }
}


export const deleteCartItems = ({token,body})=>async(dispatch)=>{
    try{
        dispatch({type:CART_SHOW_LOADING});
        // console.log(token)
        let res = await axios.patch(`${url}/delete/${token}`,body);
        // console.log(res.data)
        dispatch({type:CART_HIDE_LOADING})
        dispatch({type:DELETE_CART_ITEMS_SUCESS,payload:res.data.deleteCart})
    }catch(err){
        dispatch({type:CART_HIDE_LOADING})
        dispatch({type:DELETE_CART_ITEMS_ERROR,payload:err.message})

    }
}

