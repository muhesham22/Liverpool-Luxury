const mongoose = require("mongoose");

exports.user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: string
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    passport:{
        type: String,
        required: true
    },
    license:{
        type: String,
        required: true
    },
    bookings:[bookingSchema.booking]
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema.user);