const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    productShortCode: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 250
    },
    imageUrl: {
        type: String
    },
    isBestAchived: {
        type: Boolean
    },
    createdDate: {
        type: Date,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        min: 0,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;