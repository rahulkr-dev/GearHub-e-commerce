const express = require('express');
const {getAllProduct,getIndividualProduct,addProduct, deleteProduct,dashboardInfo,getProductByPageNation,multipleFilters,searchProduct,addReview,getReview} = require('../controllers/product');
const checkRole = require('../middlewares/checkRole');
const app = express.Router();
app.post('/add',checkRole,addProduct);

app.get('/',getAllProduct);
app.get('/pagenation',getProductByPageNation);
app.get('/search',searchProduct);
app.post('/multiple-filter',multipleFilters);
app.get('/dashboard-info',dashboardInfo);
app.get('/individual/:productId',getIndividualProduct);
app.delete('/delete/:productId',checkRole,deleteProduct);
app.post('/add/review/:productId',addReview)
app.get('/get/review/:productId',getReview)
module.exports = app;