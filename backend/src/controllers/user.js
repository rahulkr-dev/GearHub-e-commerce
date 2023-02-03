
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
            return res.status(404).send({msg:"Invalid Credentials"})
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

const createUserByAdmin = async(req,res)=>{
    try{
        const {email,password,name,role} = req.body;
        const checkUser =await User.findOne({email});
        if(checkUser){
            return res.status(409).send({msq:"Exists"})
        };
        
        // crating new user
        const user = new User({
            name,email,
            password:await argon.hash(password),role
        });
        // creting cart for the user
        const cart = new Cart({
            user:user._id
        });
        await cart.save();
        user.cart = cart._id;
        await user.save();
        res.status(201).send({msq:'User Created By Admin',data:user})
    }catch(err){
        res.status(500).send({error:err.message})
    }
}

const editByAdmin = async(req,res)=>{
    try{
        const {payload,userId} = req.body;
        if(payload.password) return res.status(401).send({msg:"Password not allowed to change"})
        const updateObject = {
            $set: {
              ...payload
            }
        };
        // let user = await User.findById(userId);
        let user = await User.findByIdAndUpdate(userId,updateObject,{new:true})
        if(!user) return res.status(404).send({msg:"User not found"});
        // await user.save();
        // let newUser = await User.findById(userId)
        res.send({msg:"User Edited Successfully",user})
    
    }catch(err){
        res.status(500).send({msg:"Internal Server Error",error:err.message})
    }
}

const deleteByAdmin = async(req,res)=>{
    try{
        const {userId} = req.body;
        let user = await User.findByIdAndDelete(userId)
        if(!user) return res.status(404).send({msg:"User not found"});
        await user.save();
        res.send({msg:"User Deleted Successfully",user})
    
    }catch(err){
        res.status(500).send({msg:"Internal Server Error",error:err.message})
    }
}
const getAllUser = async(req,res)=>{
    try{
        let user = await User.find();
        if(!user) return res.status(404).send({msg:"User not found"});
        res.send(user)
    
    }catch(err){
        res.status(500).send({msg:"Internal Server Error",error:err.message})
    }
}



module.exports = {createUser,loginUser,createUserByAdmin,editByAdmin,deleteByAdmin,getAllUser}