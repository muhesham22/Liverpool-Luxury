const mongoose = require('mongoose');
const Car = require('../models/car');
const Booking = require('../models/booking');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getAllBookings = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        let bookings;
        if (user.role === 'customer') {
            bookings = await Booking.find({user:userId});
            if (!bookings) {
                res.status(404).json({ message: 'No bookings yet', bookings })
            }else{
                res.status(200).json({ message: 'user bookings retreived', bookings })
            }
        } else {
            bookings = await Booking.find();
            res.status(200).json({ message: 'All bookings successfully retrived', bookings });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve Bookings' });
    }
};
// View booking details
exports.getBookingById = async (req, res) => {
    const bookingId = req.params.bookingId;
    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'booking retrieved', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Booking retreival failed' });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const userId = req.userId;
        const { carId } = req.params;
        const {
            startDate,
            endDate,
            paymentMethod } = req.body;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const car = await Car.findById(carId);
        const user = await User.findById(userId);
        const total = car.rentalPrice * duration;

        const booking = new Booking({
            car: carId,
            user: userId,
            startDate,
            endDate,
            total,
            paymentMethod
        });


        await booking.save();
        user.bookings.push(booking);
        await user.save();

        res.status(201).json({ message: 'booking completed successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'internal server error' });
    }
};
// Update a booking
exports.updateBooking = async (req, res) => {
    const bookingId = req.params.bookingId;
    try {
        const booking = await Booking.findById({ bookingId }).populate('car').populate('user');
        if (!booking) {
            res.status(404).json({ message: 'Invalid input booking not found' })
        }
        const status = booking.status;
        const {
            car,
            startDate,
            endDate,
            paymentMethod } = req.body;
        if (status === 'Upcoming') {
            booking.car = car || booking.car;
            booking.startDate = startDate || booking.startDate;
            booking.endDate = endDate || booking.endDate;
            booking.brand = brand || booking.brand;
            booking.paymentMethod = paymentMethod || booking.paymentMethod;
        }
        else {
            res.json({ message: 'Can not update booking unless its upcoming' })
        }
        await booking.save();
        res.status(200).json({ message: 'booking updated', booking });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Internal server error' });
    }
};
//cancelbooking
exports.cancelBooking = async (req, res) => {
    const bookingId = req.params.bookingId;
    try {
        if (!bookingId || !mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(422).json({ error: 'invalid input' });
        }
        const booking = await booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ error: 'booking not found' });
        }
        const status = booking.status;
        if (status === 'Upcoming') {
            await booking.findByIdAndDelete({ bookingId });
            res.json({ message: 'booking cancelled successfully', booking });
        }
        else {
            res.json({ message: 'Could not cancell booking unless its still upcoming' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
};
//update booking status
exports.updateBookingStatus = async (req, res) => {
    const bookingId = req.params.bookingId;
    try {
        const booking = await Booking.findById({ bookingId }).populate('car').populate('user');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.confirmation !== 'confirmed') {
            return res.status(400).json({ message: 'Booking not confirmed' })
        }
        if (booking.status === 'Cancelled') {
            booking.confirmation = 'declined'
            return res.json({ message: 'Cannot update a cancelled booking' })
        }
        booking.status = req.body.status;
        await booking.save();
        res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Internal server error' });
    }
};
//confirm booking
exports.confirmation = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await Booking.findById({ bookingId }).populate('car').populate('user');
        const { response } = req.body;
        if (response === 'confirmed' || response === 'declined') {

            booking.confirmation = response;
            if (response === 'declined') {
                booking.status = 'Cancelled';
            }
            res.json({ message: `booking ${response}` })
        }
        else {
            res.status(400).json({ error: 'Bad request' })
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Internal server error' });
    }
}