import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FacilityCard from '../components/FacilityCard'; // Import FacilityCard component
import '../styles/Facilities.css'; 

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    getCurrentLocation(); // Automatically get user location on page load
  }, []);

  useEffect(() => {
    if (location || userCoords) {
      fetchFacilities(userCoords?.latitude, userCoords?.longitude);
    }
  }, [location, type]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ latitude, longitude });

          try {
            const res = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const detectedCity = res.data.address.city || res.data.address.state;
            setLocation(detectedCity);
            fetchFacilities(latitude, longitude);
          } catch (error) {
            console.error('Error fetching city name:', error);
          }
        },
        () => {
          console.warn('Location access denied. Enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const fetchFacilities = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/api/facilities/nearby', {
        params: { location, type, latitude: lat, longitude: lon },
      });
      setFacilities(response.data);
    } catch (err) {
      setError('Failed to fetch facilities. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (facilityId, slotId, paymentMethod) => {
    if (!slotId) {
      alert('Please select a valid slot.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        { facilityId, slotId, paymentMethod },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.status === 201) {
        alert('Booking successful!');
        fetchFacilities(userCoords?.latitude, userCoords?.longitude);
      } else {
        alert('Unexpected response. Please try again.');
      }
    } catch (err) {
      alert('Error during booking: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="facilities-container">
      <h2 className="facilities-title">Nearby Storage Facilities</h2>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="location" className="filter-label">Location:</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location"
            className="filter-input"
          />
          <button onClick={getCurrentLocation} className="detect-location-btn">
            Detect My Location
          </button>
        </div>

        <div className="filter-group">
          <label htmlFor="type" className="filter-label">Type of Storage:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="filter-select"
          >
            <option value="">All</option>
            <option value="dry storage">Dry Storage</option>
            <option value="cold storage">Cold Storage</option>
          </select>
        </div>
      </div>

      {/* Facility List */}
      <div className="facilities-list">
        {loading ? (
          <p className="loading-message">Loading facilities...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : facilities.length > 0 ? (
          facilities.map((facility) => (
            <FacilityCard key={facility._id} facility={facility} onBook={handleBooking} />
          ))
        ) : (
          <p className="no-facilities-message">No facilities found.</p>
        )}
      </div>
    </div>
  );
};

export default Facilities;
