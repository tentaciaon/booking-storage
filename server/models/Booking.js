const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  facilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility' },
  slotTime: String,
  paymentMethod: String,
  amount: Number,
  status: { type: String, default: 'Pending' } // Pending, Paid, Completed
});

module.exports = mongoose.model('Booking', BookingSchema);
