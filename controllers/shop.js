const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');

const { validationResult } = require('express-validator');

const Car = require('../models/car');
const User = require('../models/user');


exports.search = async (req, res) => {
    try {
        const keyword = req.query.keyword;

        // If keyword is empty, return an empty array
        if (!keyword.trim()) {
            return res.json({ message: 'No cars found', keyword, cars: [] });
        }

        // Initialize search conditions array
        const searchConditions = [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { brand: { $regex: keyword, $options: 'i' } },
            { type: { $regex: keyword, $options: 'i' } },
            { transmissionType: { $regex: keyword, $options: 'i' } },
            { powerSystem: { $regex: keyword, $options: 'i' } }
        ];
        
        // Check if keyword is a valid number
        if (!isNaN(keyword)) {
            const numberKeyword = Number(keyword);
            searchConditions.push(
                { year: numberKeyword },
                { seats: numberKeyword },
                { rentalPrice: numberKeyword },
                { doors: numberKeyword }
            );
        }
        
        const results = await Car.find({
            $or: searchConditions,
        });

        if (results.length === 0) {
            return res.json({ message: 'No cars found', keyword, cars: [] });
        }

        res.json({ message: 'Cars fetched successfully', keyword, cars: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.filter = async (req, res) => {
    try {
        const keyword = req.params.keyword || '';
        const filterConditions = [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { brand: { $regex: keyword, $options: 'i' } },
            { type: { $regex: keyword, $options: 'i' } },
            { transmissionType: { $regex: keyword, $options: 'i' } },
            { powerSystem: { $regex: keyword, $options: 'i' } }
        ];
        
        // Check if keyword is a valid number
        if (!isNaN(keyword)) {
            const numberKeyword = Number(keyword);
            filterConditions.push(
                { year: numberKeyword },
                { seats: numberKeyword },
                { rentalPrice: numberKeyword },
                { doors: numberKeyword }
            );
        }
        
        const results = await Car.find({
            $or: filterConditions,
        });

        if (results.length === 0) {
            return res.json({ message: 'No cars found', keyword, cars: [] });
        }

        res.json({ message: 'Cars fetched successfully', keyword, cars: results });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
