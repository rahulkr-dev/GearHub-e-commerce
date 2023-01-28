const Product = require('../models/product')

const addProduct = async(req,res)=>{
    try{
        let product = new Product(req.body);
        await product.save();
        res.status(201).send({msg:'product added sucessfully',data:product})

    }catch(err){
        res.status(500).send({msg:"internal server error",error:err.message})

    }
}

const getAllProduct = async(req,res)=>{
    try{
        let {sortBy,sortOrder,filterBy,filterName}=req.query;
        let sort ={};
        let filter={}
        if(sortBy && sortOrder){
            sort[sortBy] = sortOrder
        }
        if(filterBy && filterName){
            filter[filterBy] = filterName
        }
        let product = await Product.find(filter).sort(sort)
        res.send(product);
    }catch(err){
        res.status(500).send({msg:"internal server error",error:err.message})
    }
};

// need to pass productId by params;
const getIndividualProduct = async(req,res)=>{
    try{
        let productId = req.params.productId;
        if(!productId){
            return res.send({mgs:"not found"})
        }
        let product = await Product.findById(productId);
        if(!product){
            return res.status(404).send({msg:'product not found'})
        }else{
            res.send(product);
        }
    }catch(err){
        res.status(500).send({msg:"internal server error"})
    }
}

module.exports = {addProduct,getAllProduct,getIndividualProduct}