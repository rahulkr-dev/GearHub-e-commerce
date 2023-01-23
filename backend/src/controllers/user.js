
const jwt = require('jsonwebtoken')
const argon = require('argon2')
const Cart = require('../models/cart')
const User = require('../models/user')

const createUser = async(req,res)=>{
    try{
        const {email,password,name} = req.body;
        const checkUser =await User.findOne({email});
        if(checkUser){
            return res.status(409).send({msq:"Exists"})
        };
        
        // crating new user
        const user = new User({
            name,email,
            password:await argon.hash(password)
        });
        // creting cart for the user
        const cart = new Cart({
            user:user._id
        });
        await cart.save();
        user.cart = cart._id;
        await user.save();
        res.status(201).send({msq:'Created',data:user})
    }catch(err){
        res.status(500).send({error:err.message})
    }
}


const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send({msg:"User not exists"})
        }
        if(!await argon.verify(user.password,password)){
            return res.send({msg:"Invalid Credentials"})
        }
        const payload = {email,userId:user._id,cartId:user.cart,role:user.role};
        const token = jwt.sign(payload,process.env.VERIFICATION_KEY,{
            expiresIn:"7d"
        });

        res.send({msg:"login sucessfully",token})

    }catch(err){
        res.status(500).send({msg:err.message})
    }
}

module.exports = {createUser,loginUser}