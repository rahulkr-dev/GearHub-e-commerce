
const jwt = require('jsonwebtoken')
const Cart = require('../models/cart')
const User = require('../models/user')
// sending productId and productQty from body and token getting from param
const addToCart = async(req,res)=>{
    try{
        const token = req.params.token;
        const productId = req.body.productId;
        if(!token || !productId){
            return res.status(404).send({msg:"cart or product are not found"});
        };

        let decode = jwt.decode(token);
        if(!decode) return res.send({msg:"User not exits"});

        let cartId = decode.cartId;
        if(!cartId) return res.send({msg:"cart not exists"})

        // check wheater product already present in cart or not
        let cart = await Cart.findById(cartId);
        if(!cart) return res.status(404).send('unauthenticate user')
        let product = cart.items.find((item)=>{
            // need to convert in string becasue mongoId is not a string
            return item.product.toString()==productId;
        });
        
        if(product){
            // find method return reference so that's why we can change in product and our cart should also changed

            product.quantity+=req.body.productQty;

        }else{
            let payload = {
                product:productId,
                quantity:req.body.productQty
            };
            cart.items.push(payload);
        };
        await cart.save();
        res.status(201).send({msg:"product add sucessfully",data:cart})

       


    }catch(err){
        res.status(500).send({error:err.message})
    }
}

const getCartOfUser = async(req,res)=>{
    try{
        let token = req.params.token;
        if(!token) return res.status(404).send("token not exists")
        let decode = jwt.decode(token);
        if(!decode) return res.status(404).send('User not exists');
        const userId = decode.userId;
        const cartId = decode.cartId;
        if(!userId) return res.status(404).send("UserId Not Found")
        // let user = await User.findById(userId,{cart:1,_id:0}).populate("cart");
        let cart = await Cart.findById(cartId).populate('items.product')
        // if(!user) return res.status(404).send("Cart Not Found")
        res.send(cart)
    }catch(err){
        res.status(500).send({msg:"Internal Server Error",Error:err.message})
    }
}

// delete item from cart
// get productId from body and cartId from params
const deleteItem = async(req,res)=>{
    try{
        let token = req.params.token;
        if(!token) return res.status(404).send("Token is missing")
        let productId = req.body.productId;
        if(!productId) res.status(404).send('Product Id is missing')
        let decode = jwt.decode(token);
        let cartId = decode.cartId;
        let userCart = await Cart.findById(cartId)
        if(!userCart) return res.status(404).send({msg:"Cart not found"});
        let index;
        userCart.items.map((item,i)=>{
            if(item.product.toString()==productId){
                index=i
            }
        });
        // console.log(index)
        let deleteCart = userCart.items.splice(index,1);
        await userCart.save();
        res.send({msg:"Delete item successfully",deleteCart})
    }catch(err){
        res.status(500).send({msg:"Internal Server Error",Error:err.message})
    }
}


module.exports = {addToCart,getCartOfUser,deleteItem}