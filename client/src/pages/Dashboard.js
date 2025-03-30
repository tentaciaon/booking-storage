import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to access the dashboard.');
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bookings/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookingHistory(response.data);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchUserData();
    fetchBookingHistory();
  }, [navigate]);

  return (
    <div>
      <h1>Welcome, {user?.name || 'User'}!</h1>
      <h2>Booking History</h2>
      <ul>
        {bookingHistory.length > 0 ? (
          bookingHistory.map((booking) => (
            <li key={booking._id}>
              {booking.facilityName} - {booking.slotTime} - {booking.paymentMethod.toUpperCase()}
            </li>
          ))
        ) : (
          <p>No bookings yet.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
