import { useState } from 'react';
import Map from './Map';
import Slideshow from './Slideshow';
// import SearchBox from '../components/SearchBox';


// function Details({ combinedData }) {
//   const [currentIndex, setCurrentIndex] = useState(null)

//   return (
//     <>
//     <SearchBox/>
//       <div className="App">
//         <Slideshow
//           combinedData={combinedData}
//           currentIndex={currentIndex}
//           setCurrentIndex={setCurrentIndex}
//         />
//         {!!combinedData && <Map
//           selectedLocation={currentIndex ? [combinedData[currentIndex].latitude, combinedData[currentIndex].longitude] : null}
//           setCurrentIndex={setCurrentIndex}
//           combinedData={combinedData}
//         />}
//       </div>
//     </>
//   );
// }

// export default Details;
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
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];
function Details({ combinedData }) {
  const [currentIndex, setCurrentIndex] = useState(null);

  const businessesWithImages = combinedData.map((business, index) => ({
    ...business,
    imageUrl: images[index % images.length], // Περιοδικότητα για τις εικόνες
  }));

  return (
    <div className="content-container">
      <div className="left-content">
        <div className="businesses-container">
          {businessesWithImages.map((business, index) => (
            <div
              key={index}
              className="business-card"
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={business.imageUrl}
                alt={business.name}
                className="business-image"
              />
              <div className="business-content">
                <h2>{business.name}</h2>
                <p>{business.description || "No description available"}</p>
                <p>
                  <b>Address:</b> {business.road_name}, {business.city}
                </p>
              </div>
              {/* Προσθήκη κουμπιών */}
              <div className="button-container">
                <HeartButton business={business} />
                <StarButton business={business} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="right-content">
        {!!combinedData && (
          <Map
            selectedLocation={
              currentIndex !== null
                ? [
                    combinedData[currentIndex].latitude,
                    combinedData[currentIndex].longitude,
                  ]
                : null
            }
            setCurrentIndex={setCurrentIndex}
            combinedData={combinedData}
          />
        )}
      </div>
    </div>
  );
}

export default Details;