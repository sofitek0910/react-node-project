const Route = require('express').Router();
const { payment, paypalPayment, paypalDone } = require('../controllers/paymentController');

Route.post('/', payment);
Route.post('/paypal', paypalPayment);
Route.get('/paypal/done', paypalDone);

module.exports = Route;