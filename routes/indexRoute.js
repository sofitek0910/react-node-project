const Route = require('express').Router();
const { getIndex, getAllProducts } = require('../controllers/indexController');

Route.get('/', getIndex);
Route.get('/allproducts', getAllProducts);

module.exports = Route;