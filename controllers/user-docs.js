const User = require('../models/user')
const Booking = require('../models/booking')
const mongoose = require('mongoose');
const booking = require('../models/booking');

exports.manageDocs = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        const { type, bookingId } = req.query;
        const booking = await Booking.findById(bookingId)
        const files = req.files.map(file => {
            return file.path.replace("\\", "/");
        });
        if (files.length < 1) {
            return res.status(404).json({ error: 'Documents could not be found' })
        }
        if (type === 'profile' && user && mongoose.Types.ObjectId.isValid(carId)) {
            user.image = files[0];
        }
        else if (type === 'passport') {
            if(booking){
                booking.documents.push(files);
            }
            if (user) {
                user.passport = files;
            }
        }
        else if (type === 'license') {
            if(booking){
                booking.documents.push(files);
            }
            if (user) {
                user.license = files;
            }
        }
        res.json({ message: 'Documents uploaded successfully' })
        console.log(files);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' })
    }
};