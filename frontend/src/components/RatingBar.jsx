import "../styles/styles.css"

import React, { useState } from "react";


function RatingBar({ maxStars = 5, onRate }) {
  const [hoveredRating, setHoveredRating] = useState(0); 
  const [selectedRating, setSelectedRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoveredRating(index); 
  };

  const handleMouseOut = () => {
    setHoveredRating(0); 
  };

  const handleClick = (index) => {
    setSelectedRating(index); 
    if (onRate) onRate(index); 
  };

  return (
    <div className="rating-bar">
      {Array.from({ length: maxStars }).map((_, index) => (
        <span
          key={index}
          className={`star ${index < (hoveredRating || selectedRating) ? "filled" : ""}`}
          onMouseOver={() => handleMouseOver(index + 1)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingBar;