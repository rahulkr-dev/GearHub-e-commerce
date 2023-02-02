const express = require('express');
const {getAllProduct,getIndividualProduct,addProduct, deleteProduct,dashboardInfo,getProductByPageNation,multipleFilters} = require('../controllers/product');
const checkRole = require('../middlewares/checkRole');
const app = express.Router();
app.post('/add',checkRole,addProduct);

app.get('/',getAllProduct);
app.get('/pagenation',getProductByPageNation);
app.post('/multiple-filter',multipleFilters);
app.get('/dashboard-info',dashboardInfo);
app.get('/individual/:productId',getIndividualProduct);
app.delete('/delete/:productId',checkRole,deleteProduct);
module.exports = app;