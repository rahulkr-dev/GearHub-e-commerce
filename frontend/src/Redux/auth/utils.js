import jwt_decode from "jwt-decode";
export const fetchDataLOCAL = (key)=>{
    try{
        const res = jwt_decode(localStorage.getItem(key));
        return res;

    }catch(err){
        console.log(err)
        return ""
    }
} 