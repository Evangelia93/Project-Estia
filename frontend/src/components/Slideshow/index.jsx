import { useState, useEffect, useMemo } from 'react';
import styles from './Slideshow.module.css';
import HeartButton from '../HeartButton';
import StarButton from "../StarButton"
import { LeftButton } from '../LeftButton';
import { RightButton } from '../RightButton';
import img1 from '../../assets/cafe_spots/1.jpeg';
import img2 from '../../assets/cafe_spots/2.jpeg';
import img3 from '../../assets/cafe_spots/3.jpeg';
import img4 from '../../assets/cafe_spots/4.jpeg';
import img5 from '../../assets/cafe_spots/5.jpeg';
import img6 from '../../assets/cafe_spots/6.jpeg';
import img7 from '../../assets/cafe_spots/7.jpeg';
import img8 from '../../assets/cafe_spots/8.jpeg';
import img9 from '../../assets/cafe_spots/9.jpeg';
import img10 from '../../assets/cafe_spots/10.jpeg';
import img11 from '../../assets/cafe_spots/11.jpeg';
import img12 from '../../assets/cafe_spots/12.jpeg';
const localImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

function Slideshow ({ onCardClick, currentIndex, setCurrentIndex, combinedData }) {
  const slides = useMemo(() => combinedData && combinedData.map((item, index) => ({ ...item, imageUrl: localImages[index] || '' })), [combinedData])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return <div>Loading...</div>;
  }

  const currentSetIndex = currentIndex !== null ? currentIndex : 0;

  return (
    <div className={styles.slideshowContainer}>
      <LeftButton onClick={prevSlide} />
      <div
        className={styles.card}
        onClick={() => {
          onCardClick(slides[currentSetIndex])
        }} // Pass the selected slide data
      >
        <img src={slides[currentSetIndex].imageUrl} alt={slides[currentSetIndex].name} className='img'/>
        <div className={styles.text_content}>
          <h2>{slides[currentSetIndex].name}</h2>
          <p>{slides[currentSetIndex].description}</p>
          <p><b>Address:</b> {slides[currentSetIndex].road_name}, {slides[currentSetIndex].city}</p>
        </div>
        <div className={styles.favoriteButtonContainer}>
          <HeartButton business={slides[currentSetIndex]} />
          <StarButton business={slides[currentSetIndex]} />
        </div>
      </div>
      <RightButton onClick={nextSlide} />
    </div>
  );
}

export default Slideshow;