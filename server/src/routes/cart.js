const express = require('express');
const router = new express.Router();
const Cart = require('../models/cart');

router.get('/cart', async (req, res) => {
    try {
        if (!req.query.id) {
            const cartProducts = await Cart.find();
            res.send(cartProducts);
        } else {
            const checkExistence = await Cart.exists({id: req.query.id});
            if (checkExistence) {
                res.send({isPresent: true})
            } else {
                res.send({isPresent: false})
            }
        }
    } catch(e) {
        res.status(500).send(e);
    }
});

router.put('/cart', async(req, res) => {
    try {
        const productExist = await Cart.exists({id: req.body.id});
        if (productExist) {
            if (req.body.count != 0){
                const product = await Cart.findById(productExist._id);
                product.count = req.body.count;
                await product.save();
            } else {
                await Cart.findByIdAndDelete(productExist._id);
            }
            
        }
        else {
            const cartProduct = new Cart(req.body);
            await cartProduct.save();
        }
        
        res.send();
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;