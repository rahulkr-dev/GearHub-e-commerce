const express = require('express')
const app = express.Router();

const {placeOrder,updateStatus,getOrderByUser} = require('../controllers/order')

app.post('/placed',placeOrder)
app.post('/update-status',updateStatus)
app.get('/get-order/:token',getOrderByUser)

module.exports = app;