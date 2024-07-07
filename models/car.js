const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rentalprice: {
        type: Number,
        required: true
    },
    describtion: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    type: {
        type: String,
        enum: ['SUV', 'Sedan', 'Sport', 'Luxury', 'Economy']
    },
    transmissionType: {
        type: String,
        enum: ['Manual', 'Automatic']
    },
    powerSystem: {
        type: String,
        enum: ['Conventional/gas', 'Electric', 'Hybrid']
    },
    seats: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Car', carSchema);