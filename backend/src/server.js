const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const cors = require('cors')
const connect = require('./config/db')
const PORT = process.env.PORT || 8080;

const userRoute = require('./routes/user')
const cartRoute = require('./routes/cart')
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order')
// crating server
const app = express();
//  middelwares
app.use(express.json());
app.use(cors());
// routes
app.use('/api/user',userRoute)
app.use('/api/cart',cartRoute)
app.use('/api/product',productRoute)
app.use('/api/order',orderRoute)

app.get('/',(req,res)=>{
    res.send('its working')
});


// listening on port

app.listen(PORT,async()=>{
    // connect mongoDB 
    try{
        connect();
        console.log(`http://localhost:${PORT}`)
    }catch(err){
        console.log(err.message)
    }


})
