const express = require('express');
const router = express.Router();

const bookingcontroller = require('../controllers/bookings');
const authing = require('../middlewares/authing');
const { isAdmin } = require('../middlewares/isadmin');
const bookingvalidation = require('../validation/booking');

router.get('/:bookingId', authing, isAdmin, bookingcontroller.getBookingById);

router.get('/viewall', authing, isAdmin, bookingcontroller.getAllBookings);

router.post('/' , authing , bookingvalidation.isBooking, bookingvalidation.requires ,bookingcontroller.createBooking)

router.patch('/confirm/:bookingId', authing, isAdmin, bookingcontroller.confirmation);

router.patch('/status/:bookingId', authing, isAdmin, bookingcontroller.updateBookingStatus);

router.delete('/:bookingId', authing, bookingcontroller.cancelBooking);

module.exports = router;
