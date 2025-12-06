import React from "react";
import "./Loader.css";

const Loader = ({ size = 12, color = "lightgray" }) => {
  const dotStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
  };

  return (
    <div className="loader-container">
      <div className="dot dot1" style={dotStyle}></div>
      <div className="dot dot2" style={dotStyle}></div>
      <div className="dot dot3" style={dotStyle}></div>
    </div>
  );
};

export default Loader;
