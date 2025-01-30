import React from "react";
import {Link} from "react-router-dom"
import "./paymentsuccess.css"


const Paymentsuccess = ({ user }) => {
    
    console.log(user)
  return (
    <div className="payment-success-page">
       {
        user && (
            <div className="success-message">
                <h2>Payment Successful</h2>
                <p>Your course subscription has been activated</p>
                <Link to={`${user._id}/dashboard`} className="comman-btn" 
                    style={{ backgroundColor: "red", color: "#fff" }}
                >
                    Go to Dashboad
                </Link>
            </div>
        )
       }
    </div>
  );
};

export default Paymentsuccess;

