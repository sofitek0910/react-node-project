const Product = require('../models/product');

const getEyeGlasses = async (req, res, next) => {
    try {
        const eyeglasses = await Product.find({ type: "view" });
        res.json(eyeglasses);
    } catch (error) {
        next(error);
    }
};

const getInfoEyeGlasses = (req, res, next) => {
    res.send(`This is the info page of the ${req.params.name} eyeglasses`);
};

module.exports = { getEyeGlasses, getInfoEyeGlasses };