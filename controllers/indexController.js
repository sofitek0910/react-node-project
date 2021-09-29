const Product = require('../models/product');
const Cart = require('../models/cart');
const path = require('path');

const getIndex = (req, res, next) => {
    console.log('SERVER IS WORKING');
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        const cart = await Cart.find();
        res.json({ products: products, cart: cart });
    } catch (error) {
        next(error);
    }
};

module.exports = { getIndex, getAllProducts };