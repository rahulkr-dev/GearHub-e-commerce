const mongoose = require('mongoose')

const itemSchema = {
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    quantity: Number,
    price: Number

}
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    address: {
        type: String,
        required: true
    },
    items: [itemSchema],
    total: Number,
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
})

const Order = mongoose.model('order', orderSchema);

module.exports = Order;