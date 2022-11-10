const express = require('express');
const router = new express.Router();
const Product = require('../models/product');

router.post('/products', async (req, res) => {
    try {
        let products;
        if (req.body.sortBy !== '' && req.body.sortDirection !== ''){
            products = await Product.find()
              .select('productName productShortCode price quantity createdDate')
              .sort({
                  [req.body.sortBy]:[req.body.sortDirection]
              })
              .skip(req.body.start)
              .limit(req.body.size);  
        } else {
            products = await Product.find()
              .select('productName productShortCode price quantity createdDate')
              .skip(req.body.start)
              .limit(req.body.size); 
        }
        
        if (!products) {
            return res.status(404).send();
        }
        res.send(products);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/products/create', async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/product-by-id', async (req, res) => {
    try {
        if(req.body.id) { 
            const product = await Product.findById(req.body.id);
            if (!product) {
                res.status(404).send()
            }
            res.send(product);
        } else {
            throw new Error('No id provided!');
        }
    } catch (e) {
        res.status(500).send(e);
    }
});

router.put('/products', async (req, res) => {
    if (!req.body.id) {
        res.status(404).send();
    }
    const requestedUpdates = Object.keys(req.body);
    try {
        const product = await Product.findById(req.body.id);
        requestedUpdates.forEach(update => product[update] = req.body[update]);

        await product.save();
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

router.delete('/products', async (req, res) => {
    if (!req.query.id) {
        res.status(404).send();
    }
    try {
        await Product.findByIdAndDelete(req.query.id);
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
})


module.exports = router;