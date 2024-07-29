const express = require('express');
const router = express.Router();

const admincontroller = require('../controllers/admin');
const authing = require('../middlewares/authing');
const { isAdmin } = require('../middlewares/isadmin');
const carvalidation = require('../validation/car');

router.post('/cars', authing, isAdmin, carvalidation.requires(), carvalidation.isProduct(), admincontroller.PostCar);

router.get('/booking/:bookingId', authing, isAdmin, admincontroller.getBookingById);

router.post('/booking/:bookingId', authing, isAdmin, admincontroller.confirmation);

router.get('/booking/viewall', authing, isAdmin, admincontroller.getAllBookings);



router.patch('cars/:carId', authing, isAdmin, carvalidation.requires(), carvalidation.isProduct(), admincontroller.updateCar);

router.delete('cars/:carId', authing, isAdmin, admincontroller.deleteCar);

module.exports = router;
