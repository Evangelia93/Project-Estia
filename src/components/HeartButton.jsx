import React, { useState } from 'react';
import "../styles/styles.css"

function HeartButton({ business }) {
    const [isFavorite, setIsFavorite] = useState(false);
  
    const toggleFavorite = () => {
      setIsFavorite(!isFavorite);
  
      if (!isFavorite) {
        console.log(`${business.name} added to favorites`);
      } else {
        console.log(`${business.name} removed from favorites`);
      }
    };
  
    return (
      <button
        className={`heart-button ${isFavorite ? 'favorite' : ''}`}
        onClick={toggleFavorite}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    );
  }
  
  export default HeartButton;