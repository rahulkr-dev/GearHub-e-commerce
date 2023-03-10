const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review_title:{
    type:String
  },
  comment: {
    type: String
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    index: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum:["Footwear","Bottomwear","Topwear","Accessories"]
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'kids',"all"]
  },
  size: {
    type: String,
    required: true,
    enum: ['S', 'M', 'L', 'XL', 'XXL']
  },
  image_urls: {
    type: [String],
    default: []
  },
  reviews: {
    type: [reviewSchema],
    default: []
  }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
