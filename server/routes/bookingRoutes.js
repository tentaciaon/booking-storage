const express = require('express');
const Booking = require('../models/Booking');
const Facility = require('../models/Facility');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
};

// Book a facility
router.post('/', verifyToken, async (req, res) => {
  const { facilityId, paymentMethod } = req.body;
  try {
    const facility = await Facility.findById(facilityId);
    if (!facility || facility.availableSlots <= 0) {
      return res.status(400).json({ message: 'No slots available' });
    }

    const booking = new Booking({
      user: req.userId,
      facility: facilityId,
      paymentMethod,
      slot: 1, // Simplified for this example
      paymentStatus: paymentMethod === 'online' ? 'paid' : 'pending',
    });
    await booking.save();

    // Update facility slot count
    facility.availableSlots -= 1;
    await facility.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
