const { body } = require('express-validator');
const User = require('../models/user')

exports.isBooking = () => {
    return [
        body('user')
            .notEmpty().withMessage('Booking must contain a user')
            .custom(async user => {
                const theuser = await User.findById(user);
                if (!theuser) {
                    throw new Error('User not found');
                }
            }),
            body('car')
            .notEmpty().withMessage('Booking must contain a car')
            .custom(async car => {
                const thecar = await User.findById(car);
                if (!thecar) {
                    throw new Error('Car not found');
                }
            }),
            body('startDate')
            .isISO8601().withMessage('Start date must be a valid date')
            .toDate()
            .custom((startDate, { req }) => {
              const today = new Date();
              const maxBookingDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 365);
              if (startDate < today) {
                throw new Error('Start date cannot be in the past');
              }
              if (startDate > maxBookingDate) {
                throw new Error('Start date cannot be more than 1 year in the future');
              }
              return true;
            }),
          body('endDate')
            .isISO8601().withMessage('End date must be a valid date')
            .toDate()
            .custom((endDate, { req }) => {
              const startDate = new Date(req.body.startDate);
              if (endDate < startDate) {
                throw new Error('End date cannot be before the start date');
              }
              return true;
            }),
        body('paymentMethod')
            .isIn(['cash', 'car']).withMessage('Payment method must be between cash or card')
    ];
};

exports.requires = () => {
    return [
        body('user')
            .notEmpty().withMessage('Name is required'),
        body('car')
            .notEmpty().withMessage('Price is required'),
        body('startDate')
            .notEmpty().withMessage('brand is required'),
        body('endDate')
            .notEmpty().withMessage('Description is required'),
        body('paymentMethod')
            .notEmpty().withMessage('type is required')
    ];
};