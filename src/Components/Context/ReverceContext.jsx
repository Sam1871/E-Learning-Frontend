import React from "react";
import "./context.css"

const ReverceContext = ({image, context}) => {
  return (
    <div className="container">
        <div className="contaxt-container">
            <p>{context}</p>
        </div>
        <div className="image-container">
            <img src={image} alt="" />
        </div>
        
    </div>
  );
};

export default ReverceContext;
