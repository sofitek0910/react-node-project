const Route = require('express').Router();
const { getProfile } = require('../controllers/profileController');

Route.get('/', getProfile);

module.exports = Route;