import React, { useState } from "react";

function Filter({ onApply }) {
  const [rating, setRating] = useState(0);
  const [postalCode, setPostalCode] = useState("1000");

  const handleMouseOver = (index) => {
    setRating(index);
  };

  const handleMouseOut = () => {
    setRating(0);
  };

  return (
    <div>
      <h4>Filter Options</h4>

      {/* Rating Stars */}
      <div id="rating_bar">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className="star"
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseOut={handleMouseOut}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: index < rating ? "#FFD700" : "#ccc",
            }}
          >
            ✰
          </span>
        ))}
      </div>

      <hr />

      {/* Postal Code Filter */}
      <label htmlFor="postal_code">Postal Code:</label>
      <select
        id="postal_code"
        name="postal_code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      >
        <option value="1000">1000</option>
        <option value="1030">1030</option>
        <option value="1050">1050</option>
        <option value="1090">1090</option>
      </select>

      <hr />

      {/* Apply Button */}
      <button onClick={() => onApply(rating, postalCode)}>Apply</button>
    </div>
  );
}

export default Filter;
