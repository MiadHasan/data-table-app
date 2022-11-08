const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    ProductShortCode: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        minLength: 3,
        maxLength: 250
    },
    ImageUrl: {
        type: String
    },
    IsBestAchived: {
        type: Boolean
    },
    CreatedDate: {
        type: Date
    },
    Origin: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        min: 0
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;