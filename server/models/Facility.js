const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['dry storage', 'cold storage'], required: true },
  capacity: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
  location: { type: String, required: true },
  timeSlots: [
    {
      time: { type: String, required: true }, // e.g., "10:00 AM - 12:00 PM"
      isBooked: { type: Boolean, default: false }
    }
  ]
});

module.exports = mongoose.model('Facility', FacilitySchema);
