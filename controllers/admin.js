const mongoose = require('mongoose');
const Car = require('../models/car');
const User = require('../models/user');
const Booking = require('../models/booking');
const { validationResult } = require('express-validator');


//Pushing a new car to the inventory
exports.PostCar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array()[0].msg });
    }
    if (!req.files || req.files.length === 0) {
        return res.status(422).json({ error: 'Image is required' });
    }
    try {
        const {
            name,
            year,
            brand,
            type,
            rentalprice,
            describtion,
            transmissionType,
            powerSystem,
            seats
        } = req.body;

        const images = req.files.map(file => file.path.replace('\\', "/"));
        const car = new Car({
            images,
            name,
            year,
            brand,
            type,
            rentalprice,
            describtion,
            transmissionType,
            powerSystem,
            seats
        });
        await car.save();
        res.status(201).json({ message: 'product created successfully', car });
    } catch (error) {
        console.error(error);;
        res.status(400).json({ message: 'Internal server error' });
    }
};

//Retrieve all cars 
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.status(200).json({ message: 'Cars Inventory Retrieved', cars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Retreiving a single car 
exports.getCarById = async (req, res) => {
    const carId = req.params.carId
    try {
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car could not be found' });
        }
        res.status(200).json({message:'Car retrieved successfully', car });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

//Updating an existing car
exports.updateCar = async (req, res) => {
    try {
        const carId = req.params.carId;
        if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(422).json({ error: 'Invalid iput' });
        }
        const {
            name,
            model,
            brand,
            type,
            rentalprice,
            describtion,
            transmissionType,
            powerSystem,
            seats
        } = req.body;
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car could not be found' });
        }
        car.name = name || car.name;
        car.rentalprice = rentalprice || car.rentalprice;
        car.describtion = describtion || car.describtion;
        car.year = year || car.year;
        car.brand = brand || car.brand;
        car.type = type || car.type;
        car.transmissionType = transmissionType || car.transmissionType;
        car.powerSystem = powerSystem || car.powerSystem;
        car.seats = seats || car.seats;
        await car.save();
        res.json({ message: 'car updated successfully', car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update car' });
    }
};

//delete car
exports.deleteCar = async (req, res, next) => {
    try {
        const carId = req.params.carId;
        if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(422).json({ error: 'invalid input' });
        }
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ error: 'car not found' });
        }
        await Car.findByIdAndDelete(carId);
        res.json({ message: 'car deleted successfully', car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete car' });
    }
};

//Retrieve all bookings 
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('car').populate('user');
        res.status(200).json({ message: 'All bookings successfully retrived', bookings });
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


//Manual booking
exports.createBooking = async (req, res) => {
    try {
        const {
            carId,
            userId,
            startDate,
            endDate,
            paymentMethod } = req.body;

            const start = new Date(startDate);
            const end = new Date(endDate);
            const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

            const car = await Car.findById({carId});
            const total = car.rentalprice * duration ;

        const booking = new Booking({
            car,
            user:userId,
            startDate,
            endDate,
            total,
            paymentMethod
        });

        await booking.save();
        res.status(201).json({ message: 'Manual booking completed successfully', booking });
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
            user,
            startDate,
            endDate,
            total,
            paymentMethod } = req.body;
        if (status === 'Upcoming') {
            booking.car = car || booking.car;
            booking.user = user || booking.user;
            booking.startDate = startDate || booking.startDate;
            booking.endDate = endDate || booking.endDate;
            booking.brand = brand || booking.brand;
            booking.total = total || booking.total;
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
            await booking.findByIdAndDelete(bookingId);
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
            return res.json({message:'Cannot update a cancelled booking'})
        }
        booking.status = req.body.status;
        await booking.save();
        res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Internal server error' });
    }
};
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


