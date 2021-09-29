const Route = require('express').Router();
const { getSunGlasses, getInfoSunGlasses } = require('../controllers/sunGlassesController');

Route.get('/', getSunGlasses);
Route.get('/:name', getInfoSunGlasses);

module.exports = Route;