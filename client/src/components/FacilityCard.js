import React, { useState } from "react";
import axios from "axios";

const FacilityCard = ({ facility }) => {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [amount, setAmount] = useState(100); // Set a fixed or dynamic price
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today

  const handleBooking = async (paymentMethod) => {
    if (!selectedSlot) {
      alert("Please select a slot");
      return;
    }

    if (!date) {
      alert("Please select a valid date");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/facilities/book", {
        facilityId: facility._id,
        slotTime: selectedSlot,
        date, // Include selected date
        paymentMethod,
        amount,
      });

      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error during booking");
    }
  };

  return (
    <div className="facility-card">
      <h3>{facility.name}</h3>
      <p>Location: {facility.location}</p>
      <p>Type: {facility.type}</p>
      <p>Capacity: {facility.capacity} slots</p>

      <div>
        <label>Select a date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label>Select a time slot:</label>
        {facility.timeSlots?.length > 0 ? (
          <select onChange={(e) => setSelectedSlot(e.target.value)}>
            <option value="">Choose a slot</option>
            {facility.timeSlots.map((slot, index) => (
              <option key={index} value={slot.time} disabled={slot.isBooked}>
                {slot.time} {slot.isBooked ? "(Booked)" : ""}
              </option>
            ))}
          </select>
        ) : (
          <p style={{ color: "red" }}>No slots available</p>
        )}
      </div>

      <p>Amount: ₹{amount}</p>

      <button onClick={() => handleBooking("Online")}>Pay Online</button>
      <button onClick={() => handleBooking("Cash")}>Pay at Facility</button>
    </div>
  );
};

export default FacilityCard;
