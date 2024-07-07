const Car = require('../models/car');
const User = require('../models/user');
const Booking = require('../models/booking');
const { validationResult } = require('express-validator')

exports.PostCar = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        clearImage(req.file.path.replace("\\", "/"));
        return res.status(422).json({ error: errors.array()[0].msg });
    }
    if (!req.file) {
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
        const car = new Car({
            images: req.file.path.replace('\\', "/"),
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

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.status(200).json({ message: 'Cars Inventory Retrieved', cars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send();
        }
        res.status(200).send(car);
    } catch (error) {
        res.status(500).send(error);
    }
};

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

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('car').populate('user');
        res.status(200).json({ message: 'All bookings successfully retrived', bookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete car' });
    }
};



