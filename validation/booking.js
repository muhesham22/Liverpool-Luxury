const { body } = require('express-validator');
const User = require('../models/user')

exports.isBooking = () => {
    return [
        body('user')
            .notEmpty().withMessage('Booking must contain a user')
            .custom(async user => {
                const user = await User.findById(user);
                if (!user) {
                    throw new Error('User not found');
                }
            }),
            body('car')
            .notEmpty().withMessage('Booking must contain a car')
            .custom(async carId => {
                const userId = req.userId;
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }
            }),
        body('year')
            .isNumeric().withMessage('Model year must be numeric'),
        body('seats')
            .isNumeric().withMessage('Car seats must be countable'),
        body('brand')
            .isLength({ min: 1, max: 256 }).withMessage('Brand must be 1 value')
            .trim(),
        body('describtion')
            .isLength({ min: 3, max: 1024 }).withMessage('Description must be at least 3 characters long')
            .trim(),
        body('type')
            .isIn(['SUV', 'Sport', 'Sedan', 'Luxury', 'Economy']).withMessage('Car type must be SUV | Sport | Sedan | Luxury | Economy'),
        body('transmissionType')
            .isIn(['Manual', 'Automatic']).withMessage('Car transmission type must be manual | automatic'),
        body('powerSystem')
            .isIn(['Conventional/gas', 'Electric', 'Hybrid']).withMessage('Power system must be Conventional/gas | Electric | Hybrid')
    ];
};

exports.requires = () => {
    return [
        body('name')
            .notEmpty().withMessage('Name is required'),
        body('rentalprice')
            .notEmpty().withMessage('Price is required'),
        body('brand')
            .notEmpty().withMessage('brand is required'),
        body('describtion')
            .notEmpty().withMessage('Description is required'),
        body('type')
            .notEmpty().withMessage('type is required'),
        body('seats')
            .notEmpty().withMessage('seats is required'),
        body('year')
            .notEmpty().withMessage('Model year is required'),
        body('transmissionType')
            .notEmpty().withMessage('Transmission type is required'),
        body('powerSystem')
            .notEmpty().withMessage('Power system is required'),
        body('images')
            .notEmpty().withMessage('images is required'),
    ];
};