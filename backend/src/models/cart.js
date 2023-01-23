const mongoose = require('mongoose')

const cartItemProduct = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:{
        type:Number,
        default:1
    }
})

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    items:[cartItemProduct]
},{
    timestamps:true
});

const Cart = mongoose.model('cart',cartSchema);

module.exports = Cart;