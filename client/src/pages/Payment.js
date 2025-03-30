import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const { bookingId } = useParams();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/api/payment/${bookingId}`);
        window.location.href = response.data.paymentUrl; // Redirect to Payment Gateway
      } catch (err) {
        alert('Error initiating payment: ' + err.message);
      }
    };

    initiatePayment();
  }, [bookingId]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Redirecting to Payment...</h2>
    </div>
  );
};

export default Payment;
