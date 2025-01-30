// const Businesses = ({ businesses }) => {
//   console.log("Businesses Data:", businesses); // Έλεγχος δεδομένων

//   if (!businesses || businesses.length === 0) {
//     return <p>No businesses available</p>;
//   }

//   return (
//     <div>
//       <h2>Businesses</h2>
//       <ul>
//         {businesses && businesses.map((business, index) => (
//           <li key={business.id + business.name}>{business.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Businesses;
import React from "react";
import img1 from "../assets/cafe_spots/1.jpeg";
import img2 from "../assets/cafe_spots/2.jpeg";
import img3 from "../assets/cafe_spots/3.jpeg";
import img4 from "../assets/cafe_spots/4.jpeg";
import img5 from "../assets/cafe_spots/5.jpeg";
import img6 from "../assets/cafe_spots/6.jpeg";
import img7 from "../assets/cafe_spots/7.jpeg";
import img8 from "../assets/cafe_spots/8.jpeg";
import img9 from '../assets/cafe_spots/9.jpeg';
import img10 from '../assets/cafe_spots/10.jpeg';
import img11 from '../assets/cafe_spots/11.jpeg';
import img12 from '../assets/cafe_spots/12.jpeg';
import HeartButton from "./HeartButton";
import StarButton from "./StarButton";
import "../styles/styles.css"; // Βεβαιώσου ότι υπάρχει το αντίστοιχο CSS

const localImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

const Businesses = ({ businesses }) => {
  console.log("Businesses Received:", businesses); // Έλεγχος δεδομένων

  if (!businesses || businesses.length === 0) {
    return <p>No businesses available</p>; // Εμφάνιση μηνύματος αν δεν υπάρχουν δεδομένα
  }
  const businessesWithImages = businesses.map((business, index) => ({
    ...business,
    imageUrl: localImages[index % localImages.length], // Περιοδικότητα αν οι επιχειρήσεις είναι περισσότερες από τις εικόνες
  }));

  return (
    <div className="businesses-container">
      {businessesWithImages.map((business, index) => (
        <div className="business-card" key={index}>
          <img
            src={business.imageUrl}
            alt={business.name}
            className="business-image"
          />
          <div className="business-content">
            <h2>{business.name}</h2>
            <p>{business.description || "No description available"}</p>
            <p>
              <b>Address:</b> {business.road_name || "Unknown road"},{" "}
              {business.city || "Unknown city"}
            </p>
          </div>
          {/* Container για την καρδιά και το αστέρι */}
          <div className="button-container">
            <HeartButton business={business} />
            <StarButton business={business} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Businesses;