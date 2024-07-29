const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const Car = require('../models/car');
const User = require('../models/user');

exports.viewAll = async (req, res, next) => {
    try {
        const cars = await Car.find();
        res.json({ message: 'Cars fetched successfully', cars });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.viewOne = async (req, res) => {
    try {
        const carId = req.params.carId;
        if (!carId || !mongoose.Types.ObjectId.isValid(carId)) {
            return res.status(422).json({ error: 'Car ID is required' });
        }
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.json({ message: 'Car fetched successfully', car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.search = async (req, res) => {
    try {
        const keyword = req.query.keyword || '';
        const results = await Car.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { describtion: { $regex: keyword, $options: 'i' } },
                { brand: { $regex: keyword, $options: 'i' } },
                { year: { $regex: keyword, $options: 'i' } },
                { type: { $regex: keyword, $options: 'i' } },
                { transmissionType: { $regex: keyword, $options: 'i' } },
                { powerSystem: { $regex: keyword, $options: 'i' } },
                { seats: { $regex: keyword, $options: 'i' } },
                { rentalprice: { $regex: keyword, $options: 'i' } }
            ],
        });
        res.json({ message: 'Cars fetched successfully', keyword, cars: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.filter = async (req, res) => {
    try {
        const keyword = req.params.keyword || '';
        const results = await Car.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { describtion: { $regex: keyword, $options: 'i' } },
                { brand: { $regex: keyword, $options: 'i' } },
                { year: { $regex: keyword, $options: 'i' } },
                { type: { $regex: keyword, $options: 'i' } },
                { transmissionType: { $regex: keyword, $options: 'i' } },
                { powerSystem: { $regex: keyword, $options: 'i' } },
                { seats: { $regex: keyword, $options: 'i' } },
                { rentalprice: { $regex: keyword, $options: 'i' } }
            ],
        });
        res.json({ message: 'Cars fetched successfully', keyword, cars: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
