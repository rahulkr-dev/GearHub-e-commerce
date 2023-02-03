const express = require('express');
const { addToCart,getCartOfUser,deleteItem } = require('../controllers/cart');
const app = express.Router();

app.patch('/:token/add',addToCart)
app.get('/:token',getCartOfUser)
app.patch('/delete/:token',deleteItem)

module.exports = app;