const Product = require('../models/product');

const getSunGlasses = async (req, res, next) => {
    try {
        const sunglasses = await Product.find({ type: "sun" });
        res.json(sunglasses);
    } catch (error) {
        next(error);
    }
};

const getInfoSunGlasses = (req, res, next) => {
    res.send(`This is the info page of the ${req.params.name} sunglasses`);
};

module.exports = { getSunGlasses, getInfoSunGlasses };