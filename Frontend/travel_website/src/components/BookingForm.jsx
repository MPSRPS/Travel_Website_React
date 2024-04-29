import React, { useState } from "react";
import axios from "axios";
import './booking.css';
axios.defaults.baseURL = "http://localhost:8080/";
function BookingForm() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    arrivalDate: "",
    leavingDate: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/create", formData); // Replace with your actual backend URL

      if (response.data.success) {
        console.log("Booking created successfully:", response.data);
        alert(response.data.message);
        // You might want to fetch updated bookings here

        setFormData({ // Reset form data
          from: "",
          to: "",
          arrivalDate: "",
          leavingDate: "",
        });
      } else {
        console.error("Error creating booking:", response.data.error);
        alert("An error occurred. Please try again."); // User-friendly error message
      }
    } catch (error) {
      console.error("Error during booking submission:", error);
      alert("An error occurred. Please try again."); // User-friendly error message
    }
  };

  return (
    <>
      <div className="heading">
        <h1>BOOKING</h1>
      </div>

      <div className="block">
        <section className="book" id="book">
          <div className="row">
            <div className="container">
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <h3>From</h3>
                  <select name="from" value={formData.from} onChange={handleOnChange}>
                    <option value="" disabled>Select Departure City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Tirupati">Tirupati</option>
                  </select>
                </div>
                <div className="inputBox">
                  <h3>To</h3>
                  <select name="to" value={formData.to} onChange={handleOnChange}>
                    <option value="" disabled>Select Destination City</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Nagpur">Nagpur</option>
                    <option value="Tirupati">Tirupati</option>
                  </select>
                </div>
                <div className="inputBox">
                  <h3>Arrival Date</h3>
                  <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="inputBox">
                  <h3>Leaving Date</h3>
                  <input
                    type="date"
                    name="leavingDate"
                    value={formData.leavingDate}
                    onChange={handleOnChange}
                  />
                </div>
                <button className="btn">Submit</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default BookingForm;
