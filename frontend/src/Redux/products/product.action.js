
import { LANDING_PAGE_ERROR, LANDING_PAGE_GET_DATA_SUCESS, USER_HIDE_LOADING, USER_SHOW_LOADING } from './product.types';
import  axios from 'axios';
let url = `http://localhost:8080/api/product`
export const getDataLandingPage = ()=>async(dispatch)=>{
    try{
        dispatch({type:USER_SHOW_LOADING})
        let res = await axios.get(url);
        // console.log(res.data)
        dispatch({type:USER_HIDE_LOADING})
        dispatch({type:LANDING_PAGE_GET_DATA_SUCESS,payload:res.data})
    }catch(err){
        dispatch({type:USER_HIDE_LOADING})
        dispatch({type:LANDING_PAGE_ERROR,payload:err.message})
    }
}