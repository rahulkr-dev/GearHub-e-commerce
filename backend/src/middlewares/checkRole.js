
const jwt = require('jsonwebtoken');
const checkRole = async(req,res,next)=>{
    try{
        let token = req.headers.authorization;
        if(!token) return res.status(401).send("Unauthorized")
        let decode = jwt.verify(token,process.env.VERIFICATION_KEY);
        if(!decode || decode.role!=='admin'){
           return res.status(401).send({msg:"Unauthorized"})
        }
        next();
    }catch(err){
        res.status(401).send({msg:"Unauthorized"})
    }
}

module.exports = checkRole