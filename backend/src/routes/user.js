const express = require('express');
const { createUser, loginUser } = require('../controllers/user');

const app = express.Router();

app.post('/signup',createUser);
app.post('/login',loginUser)

module.exports = app;

