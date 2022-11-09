const express = require('express');
const router = new express.Router();
const Product = require('../models/product');

router.post('/products/create', async (req, res) => {
    const product = new Product(req.body);
    console.log('post', product);
    try {
        await product.save();
        res.status(201).send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).send();
        }
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;