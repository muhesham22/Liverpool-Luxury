const express = require('express');
const router = express.Router();

const admincontroller = require('../controllers/admin');
const authing = require('../middlewares/authing');
const { isAdmin } = require('../middlewares/isadmin');
const carvalidation = require('../validation/car');

router.get('/cars/viewall', admincontroller.getAllCars)

router.get('/cars/:carId', admincontroller.getCarById)

router.post('/cars', authing, isAdmin, carvalidation.requires(), carvalidation.isCar(), admincontroller.PostCar);

router.patch('cars/:carId', authing, isAdmin, carvalidation.requires(), carvalidation.isCar(), admincontroller.updateCar);

router.delete('cars/:carId', authing, isAdmin, admincontroller.deleteCar);

router.get('/booking/:bookingId', authing, isAdmin, admincontroller.getBookingById);

router.get('/booking/viewall', authing, isAdmin, admincontroller.getAllBookings);

router.post('/booking' , authing , isAdmin , )

router.post('/booking/:bookingId', authing, isAdmin, admincontroller.confirmation);




module.exports = router;
