import React from "react";
import "../styles/styles.css";
import img1 from "../assets/icons/1.png";
import img2 from "../assets/icons/2.png";
import img3 from "../assets/icons/3.png";
import img4 from "../assets/icons/4.png";
import img5 from "../assets/icons/5.png";

const categories = [
  {
    id: 1,
    name: "Outdoor Playground",
    image: img1, 
  },
  {
    id: 2,
    name: "Zoo-Farms",
    image: img2, 
  },
  {
    id: 3,
    name: "Restaurants",
    image: img3, 
  },
  {
    id: 4,
    name: "Events",
    image: img4, 
  },
  {
    id: 5,
    name: "Indoor Playground",
    image: img5, 
  },
];

function PopularCategories({ onCategoryClick }) {
  return (
    <div className="popular-categories-container">
      <h4>Popular Categories</h4>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => onCategoryClick(category.name)}
          >
            <img src={category.image} alt={category.name} className="category-image" />
            <span className="category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularCategories;