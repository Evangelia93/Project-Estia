import React, { useMemo } from 'react';
import HeartButton from './HeartButton';
import StarButton from './StarButton';
import img1 from '../assets/cafe_spots/1.jpeg';
import img2 from '../assets/cafe_spots/2.jpeg';
import img3 from '../assets/cafe_spots/3.jpeg';
import img4 from '../assets/cafe_spots/4.jpeg';
import img5 from '../assets/cafe_spots/5.jpeg';
import img6 from '../assets/cafe_spots/6.jpeg';
import img7 from '../assets/cafe_spots/7.jpeg';
import img8 from '../assets/cafe_spots/8.jpeg';
import img9 from '../assets/cafe_spots/9.jpeg';
import img10 from '../assets/cafe_spots/10.jpeg';
import img11 from '../assets/cafe_spots/11.jpeg';
import img12 from '../assets/cafe_spots/12.jpeg';
import "../styles/styles.css"

const localImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

const CardList = ({ combinedData }) => {
  console.log("Data received in VerticalCardList:", combinedData); 

  if (!combinedData || combinedData.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="vertical-card-list">
      {combinedData.map((card, index) => (
        <div className="card" key={index}>
          <img
            src={card.imageUrl}
            alt={card.name}
            className="card-image"
          />
          <div className="card-content">
            <h2>{card.name}</h2>
            <p>{card.description}</p>
            <p><b>Address:</b> {card.road_name}, {card.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;