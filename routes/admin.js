const express = require('express');
const router = express.Router();

const carcontroller = require('../controllers/admin');
const authing = require('../middlewares/authing');
const {isAdmin} = require('../middlewares/isadmin');
const carvalidation = require('../validation/car');

router.post('/cars', authing, isAdmin, carvalidation.requires(), carvalidation.isProduct(), carcontroller.PostCar);

router.put('cars/:carId', authing, isAdmin, carvalidation.requires(), carvalidation.isProduct(), carcontroller.updateCar);

router.delete('cars/:carId', authing, isAdmin, carcontroller.deleteCar);

module.exports = router;
