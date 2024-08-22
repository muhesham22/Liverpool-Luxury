const schedule = require('node-schedule');
const Booking = require('../models/booking');

const updateBookingStatuses = async () => {
    try {
        const now = new Date();

        // Update 'Upcoming' bookings to 'Ongoing' if their start date has arrived and they are not canceled
        const ongoingBookings = await Booking.updateMany(
            { status: 'Upcoming', startDate: { $lte: now }, status: { $ne: 'Cancelled' } },
            { $set: { status: 'Ongoing' } }
        );

        // Update 'Ongoing' bookings to 'Completed' if their end date has passed and they are not canceled
        const completedBookings = await Booking.updateMany(
            { status: 'Ongoing', endDate: { $lte: now }, status: { $ne: 'Cancelled' } },
            { $set: { status: 'Completed' } }
        );

        console.log(`${ongoingBookings.nModified} bookings set to 'Ongoing'`);
        console.log(`${completedBookings.nModified} bookings set to 'Completed'`);
    } catch (error) {
        console.error('Error updating booking statuses:', error);
    }
};

// Schedule the job to run every hour
const startScheduler = () => {
    schedule.scheduleJob('0 * * * *', updateBookingStatuses); // Runs at the start of every hour
};

module.exports = startScheduler;
