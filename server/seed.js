const mongoose = require('mongoose');
require('dotenv').config();
const Facility = require('./models/Facility');

const seedFacilities = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const facilities = [
      {
        name: 'Dry Storage Facility 1',
        type: 'dry storage',
        capacity: 100,
        availableSlots: 50,
        location: 'Delhi',
        timeSlots: [
          { time: '9:00 AM - 11:00 AM', isBooked: false },
          { time: '11:00 AM - 1:00 PM', isBooked: false },
          { time: '1:00 PM - 3:00 PM', isBooked: false }
        ]
      },
      {
        name: 'Cold Storage Facility 1',
        type: 'cold storage',
        capacity: 80,
        availableSlots: 20,
        location: 'Delhi',
        timeSlots: [
          { time: '10:00 AM - 12:00 PM', isBooked: false },
          { time: '12:00 PM - 2:00 PM', isBooked: false }
        ]
      },
      {
        name: 'Cold Storage Facility 2',
        type: 'cold storage',
        capacity: 80,
        availableSlots: 10,
        location: 'Jaipur',
        timeSlots: [
          { time: '10:00 AM - 12:00 PM', isBooked: false },
          { time: '12:00 PM - 2:00 PM', isBooked: false }
        ]
      }
    ];

    await Facility.deleteMany();
    await Facility.insertMany(facilities);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedFacilities();
