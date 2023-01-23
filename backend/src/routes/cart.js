const express = require('express');
const { addToCart,getCartOfUser,deleteItem } = require('../controllers/cart');
const app = express.Router();

app.patch('/:cartId/add',addToCart)
app.get('/:userId',getCartOfUser)
app.patch('/:cartId/delete',deleteItem)

module.exports = app;