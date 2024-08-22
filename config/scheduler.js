const schedule = require('node-schedule');
const Booking = require('../models/booking');

const scheduleBookingEvents = (booking) => {
    const startDate = booking.startDate;
    const endDate = booking.endDate;

    // Cancel any existing jobs for this booking
    const startJob = schedule.scheduledJobs[`${booking._id}-start`];
    const endJob = schedule.scheduledJobs[`${booking._id}-end`];
    
    if (startJob) startJob.cancel();
    if (endJob) endJob.cancel();

    // Schedule job to update status to 'Ongoing' at start date
    if (startDate > new Date()) {
        schedule.scheduleJob(`${booking._id}-start`, startDate, async () => {
            try {
                const updatedBooking = await Booking.findById(booking._id);
                if (updatedBooking && updatedBooking.status === 'Upcoming') {
                    updatedBooking.status = 'Ongoing';
                    await updatedBooking.save();
                    console.log(`Booking ${updatedBooking._id} status updated to 'Ongoing'`);
                }
            } catch (error) {
                console.error(`Error updating booking ${booking._id} status to 'Ongoing':`, error);
            }
        });
    } else {
        // If the start date has already passed, immediately set to 'Ongoing'
        booking.status = 'Ongoing';
        booking.save().catch(err => console.error('Error updating booking status to Ongoing:', err));
    }

    // Schedule job to update status to 'Completed' at end date
    if (endDate > new Date()) {
        schedule.scheduleJob(`${booking._id}-end`, endDate, async () => {
            try {
                const updatedBooking = await Booking.findById(booking._id);
                if (updatedBooking && updatedBooking.status === 'Ongoing') {
                    updatedBooking.status = 'Completed';
                    await updatedBooking.save();
                    console.log(`Booking ${updatedBooking._id} status updated to 'Completed'`);
                }
            } catch (error) {
                console.error(`Error updating booking ${booking._id} status to 'Completed':`, error);
            }
        });
    } else {
        // If the end date has already passed, immediately set to 'Completed'
        booking.status = 'Completed';
        booking.save().catch(err => console.error('Error updating booking status to Completed:', err));
    }
};

module.exports = scheduleBookingEvents;
