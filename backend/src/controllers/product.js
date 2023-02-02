const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order')

const addProduct = async (req, res) => {
    try {
        let product = new Product(req.body);
        await product.save();
        res.status(201).send({ msg: 'product added sucessfully', data: product })

    } catch (err) {
        res.status(500).send({ msg: "internal server error", error: err.message })

    }
}

const getAllProduct = async (req, res) => {
    try {

        let product = await Product.find()
        res.send(product);
    } catch (err) {
        res.status(500).send({ msg: "internal server error", error: err.message })
    }
};
const getProductByPageNation = async (req, res) => {
    try {
        let { sortBy, sortOrder, filterBy, filterName, pageNo, limit } = req.query;
        let sort = {};
        let filter = {};
        limit = limit || 10;
        pageNo = pageNo || 1
        if (sortBy && sortOrder) {
            sort[sortBy] = sortOrder
        }
        if (filterBy && filterName) {
            filter[filterBy] = filterName
        }
        let product = await Product.find(filter).skip((pageNo - 1) * limit).limit(limit).sort(sort)
        res.send(product);
    } catch (err) {
        res.status(500).send({ msg: "internal server error", error: err.message })
    }
};

// bradn is an array req.body{gender:"male",brand:[flx,kipsta,etc],category:[footware,bottomware]}

const multipleFilters = async (req, res) => {
    try {
        let { gender, brand, category, price } = req.body;
        let filter = [];
        if (gender) {
            filter.push({ gender })
        };
        if (brand.length!==0) {
            brand = brand.map(item =>({ brand: item }));
            filter.push({ $or: brand })
        }
        if (category.length!==0) {
            category = category.map(item => {
                return { category: item }
            });
            filter.push({ $or: category })
        }
        if (price) {
            filter.push({ price: { $lte: +price } })
        }
        // console.log(filter)


        let product = await Product.find({
            $and: filter
        })
        res.send(product);
    } catch (err) {
        res.status(500).send({ msg: "internal server error", error: err.message })
    }
};




// need to pass productId by params;
const getIndividualProduct = async (req, res) => {
    try {
        let productId = req.params.productId;
        if (!productId) {
            return res.send({ mgs: "not found" })
        }
        let product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send({ msg: 'product not found' })
        } else {
            res.send(product);
        }
    } catch (err) {
        res.status(500).send({ msg: "internal server error" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        let productId = req.params.productId;
        let product = await Product.findByIdAndDelete(productId.trim())

        res.send({ msg: "Delete Product Successfully" })
    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error", msg: err.message })
    }
}

const dashboardInfo = async (req, res) => {
    try {
        // we use aggregation pipeline for counting 

        let user = await User.aggregate([{ $group: { _id: null, userCount: { $sum: 1 } } }])
        let product = await Product.aggregate([{ $group: { _id: null, productCount: { $sum: 1 } } }])
        let order = await Order.aggregate([{ $group: { _id: null, orderCount: { $sum: 1 } } }])
        res.send({
            userCount: user[0].userCount,
            productCount: product[0].productCount,
            orderCount:order[0].orderCount
        })

    } catch (err) {
        res.status(500).send({ msg: "Internal Server Error", msg: err.message })
    }
}
module.exports = { addProduct, getAllProduct, getIndividualProduct, deleteProduct, dashboardInfo, getProductByPageNation, multipleFilters }