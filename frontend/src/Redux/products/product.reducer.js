import { LANDING_PAGE_ERROR, LANDING_PAGE_GET_DATA_SUCESS, USER_HIDE_LOADING, USER_SHOW_LOADING } from './product.types';

const init = {
    loading:false,
    error:null,
    men:[],
    women:[],
    kids:[],
    accessories:[]
}
export const landingPageProduct = (state=init,{type,payload})=>{
    switch(type){
        case USER_SHOW_LOADING :{
            return {
                ...state,loading:true
            }
        }
        case USER_HIDE_LOADING :{
            return {
                ...state,loading:false
            }
        }
        case LANDING_PAGE_GET_DATA_SUCESS :{
            let men = payload.filter((item)=>item.gender=="male")
            let women = payload.filter((item)=>item.gender=="female")
            let kids = payload.filter((item)=>item.gender=="kids")
            let accessories = payload.filter((item)=>item.category=="Accessories")
            return {
                ...state,
                men,women,kids,accessories
            }
        }
        default : return state
    }
}
