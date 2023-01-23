const express = require('express');
const {getAllProduct,getIndividualProduct,addProduct} = require('../controllers/product')
const app = express.Router();
app.post('/add',addProduct);
app.get('/',getAllProduct);
app.get('/:productId',getIndividualProduct);
module.exports = app;