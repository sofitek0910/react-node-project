const Route = require('express').Router();
const { getCart, insertProductInTheCart, deleteOneItem, deleteAllItems } = require('../controllers/cartController');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { delivery, deliveryOtherAddress } = require('../controllers/deliveryController');

Route.get('/', getCart);
Route.post('/', insertProductInTheCart);
Route.post('/login', login);
Route.post('/register', register);
Route.post('/delivery', delivery);
Route.post('/delivery/otheraddress', deliveryOtherAddress);
Route.delete('/', deleteOneItem);
Route.delete('/clear', deleteAllItems);

module.exports = Route;