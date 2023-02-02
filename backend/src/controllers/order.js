
const Order = require('../models/order');
const jwt = require('jsonwebtoken')


const placeOrder = async(req,res)=>{
    try{
        let token = req.body.token
        let decode = jwt.decode(token);
        const payload = {...req.body.data,user:decode.userId}
        const order = new Order(payload);
        await order.save();
        res.status(201).send({msg:"Order Place Successfully",order})
    }catch(e){
        res.status(500).send(e.message)
    }
}

const getOrderByUser = async(req,res)=>{
    try{
        let token = req.params.token;
        let decode = jwt.decode(token);
        let user = decode.userId
        // if(!decode || !decode.userId) return res.status(404).send('Not found');

        let userOrder = await Order.find({user}).populate('items.product');
        res.send(userOrder)
    }catch(e){
        res.status(500).send(e.message)
    }
}

const updateStatus = async(req,res)=>{
    try{
        let orderId = req.params.orderId;
        let upadateStatus = req.params.status
        if(!orderId || !upadateStatus) return res.status(404).send("Not Found")
        let order = await Order.findById(orderId);
        if(!order) return res.status(404).send('Order Not found')
        order.status = upadateStatus
        await order.save()
        res.status(userOrder)
    }catch(e){
        res.status(500).send(e.message)
    }
}

module.exports = {
    placeOrder,
    updateStatus,
    getOrderByUser
}