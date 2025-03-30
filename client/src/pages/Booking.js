import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const Booking = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const slotId = searchParams.get('slot');
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/facilities/${id}`);
        setFacility(response.data);
      } catch (err) {
        console.error("Error fetching facility details", err);
      }
      setLoading(false);
    };

    fetchFacilityDetails();
  }, [id]);

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        { facilityId: id, slotId, paymentMethod },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      alert('Booking successful!');
      
      if (paymentMethod === 'online') {
        navigate(`/payment/${response.data.booking._id}`); // Redirect to Payment Page
      } else {
        navigate('/facilities'); // Redirect back to facilities after cash booking
      }

    } catch (err) {
      alert('Error during booking: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Confirm Your Booking</h2>
      {loading ? (
        <p>Loading facility details...</p>
      ) : (
        facility && (
          <div>
            <p><strong>Facility Name:</strong> {facility.name}</p>
            <p><strong>Location:</strong> {facility.location}</p>
            <p><strong>Selected Slot:</strong> {slotId}</p>

            <h4>Choose Payment Method:</h4>
            <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
              <option value="online">Online Payment</option>
              <option value="cash">Cash at Counter</option>
            </select>

            <button style={{ marginLeft: '10px' }} onClick={handleBooking}>
              Confirm Booking
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Booking;
