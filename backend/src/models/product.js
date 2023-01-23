const {Schema,model} = require('mongoose')

const productSchema = new Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    category: {
        type: String,
    }
},{
    timestamps:true,
    versionKey:false
});

const Product = model('product',productSchema);

module.exports = Product;