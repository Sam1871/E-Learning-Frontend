import React, { useContext, useState } from "react";
import "./paymentpage.css";
import { useNavigate, useParams} from "react-router-dom";
import {useCourseData} from "../../Context/CourseContext"

const PaymentForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  const [error, setError] = useState("");
  const params = useParams();
  const courseId = params.id;

  const userId = user?._id;

  const { addCourse, } = useCourseData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!userId) {
      setError("User is not logged in.");
      return;
    }

    // Add basic validation for form fields
    if (!formData.name || !formData.cardNumber || !formData.expiryDate || !formData.cvv) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await addCourse(userId, courseId,navigate,token);
      console.log("Course added successfully!");
      // You can navigate or display a success message here
      
    } catch (err) {
      console.error("Error adding course:", err);
      setError("Failed to complete the payment. Please try again.");
    }
  };

  return (
    <div className="main-container">
      <div className="payment-container">
        <div className="header">
          <h2>Payment Information</h2>
        </div>
        <form className="payment-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="name">Cardholder's Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="card-number">Credit Card Number</label>
            <input
              type="text"
              id="card-number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9876 5432"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="expiry-date">Expiry Date</label>
            <input
              type="month"
              id="expiry-date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              required
            />
          </div>

          <div className="form-group">
            <button type="submit" className="pay-button">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
