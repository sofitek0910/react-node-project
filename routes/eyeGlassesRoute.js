const Route = require('express').Router();
const { getEyeGlasses, getInfoEyeGlasses } = require('../controllers/eyeGlassesController');

Route.get('/', getEyeGlasses);
Route.get('/:name', getInfoEyeGlasses);

module.exports = Route;