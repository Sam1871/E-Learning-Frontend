import React from "react";
import "./context.css"

const Context = ({image, context}) => {
  return (
    <div className="container">
        <div className="image-container">
            <img src={image} alt="" />
        </div>
        <div className="contaxt-container">
            <p>{context}</p>
        </div>
    </div>
  );
};

export default Context;


