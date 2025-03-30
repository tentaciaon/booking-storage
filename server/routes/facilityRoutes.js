const express = require('express');
const Facility = require('../models/Facility');
const Booking = require('../models/Booking');

const router = express.Router();

// Get nearby facilities
router.get('/nearby', async (req, res) => {
  try {
    const { location, type } = req.query;
    let query = {};
    if (location) query.location = location;
    if (type) query.type = type;

    const facilities = await Facility.find(query);

    // Ensure timeSlots is always an array
    const updatedFacilities = facilities.map(facility => ({
      ...facility.toObject(),
      timeSlots: facility.timeSlots || [] // Default to an empty array
    }));

    res.json(updatedFacilities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching facilities' });
  }
});

// Get available slots for a facility
router.get('/:id/slots', async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    res.json(facility.timeSlots.filter(slot => !slot.isBooked));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slots' });
  }
});

// Create a booking
router.post('/book', async (req, res) => {
  try {
    const { facilityId, slotTime, paymentMethod, amount } = req.body;

    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    const slot = facility.timeSlots.find(slot => slot.time === slotTime);
    if (!slot || slot.isBooked) {
      return res.status(400).json({ message: 'Slot not available' });
    }

    slot.isBooked = true;
    await facility.save();

    const booking = new Booking({ facilityId, slotTime, paymentMethod, amount, status: 'Confirmed' });
    await booking.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error processing booking' });
  }
});

module.exports = router;
