const express = require('express');
const {getAllProduct,getIndividualProduct,addProduct} = require('../controllers/product');
const checkRole = require('../middlewares/checkRole');
const app = express.Router();
app.post('/add',checkRole,addProduct);

app.get('/',getAllProduct);
app.get('/individual/:productId',getIndividualProduct);
module.exports = app;