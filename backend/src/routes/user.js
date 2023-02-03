const express = require('express');
const { createUser, loginUser,createUserByAdmin,editByAdmin,deleteByAdmin,getAllUser } = require('../controllers/user');
const checkRole = require('../middlewares/checkRole')

const app = express.Router();

app.post('/signup',createUser);
app.post('/login',loginUser);

app.get('/alluser',checkRole,getAllUser)
app.post('/admin/signup',checkRole,createUserByAdmin);
app.patch('/admin/edit',checkRole,editByAdmin);
app.delete('/admin/delete',checkRole,deleteByAdmin);


module.exports = app;

