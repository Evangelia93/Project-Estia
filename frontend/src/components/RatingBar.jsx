import "../styles/styles.css"

import React, { useState } from "react";


function RatingBar({ maxStars = 5, onRate }) {
  const [hoveredRating, setHoveredRating] = useState(0); // Για hover
  const [selectedRating, setSelectedRating] = useState(0); // Για επιλεγμένη βαθμολογία

  const handleMouseOver = (index) => {
    setHoveredRating(index); // Ενημερώνει το hover rating
  };

  const handleMouseOut = () => {
    setHoveredRating(0); // Reset όταν φεύγει το ποντίκι
  };

  const handleClick = (index) => {
    setSelectedRating(index); // Αποθηκεύει τη βαθμολογία
    if (onRate) onRate(index); // Στέλνει τη βαθμολογία μέσω callback
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