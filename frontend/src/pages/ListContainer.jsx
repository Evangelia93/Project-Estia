import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useBusinessData } from "../hooks/useBusinessData"; 
import HeartButton from "../components/HeartButton";
import StarButton from "../components/StarButton";
import SearchBox from "../components/SearchBox";
import img1 from "../assets/cafe_spots/1.jpeg";
import img2 from "../assets/cafe_spots/2.jpeg";
import img3 from "../assets/cafe_spots/3.jpeg";
import img4 from "../assets/cafe_spots/4.jpeg";
import img5 from "../assets/cafe_spots/5.jpeg";
import img6 from "../assets/cafe_spots/6.jpeg";
import img7 from "../assets/cafe_spots/7.jpeg";
import img8 from "../assets/cafe_spots/8.jpeg";
import img9 from "../assets/cafe_spots/9.jpeg";
import img10 from "../assets/cafe_spots/10.jpeg";
import img11 from "../assets/cafe_spots/11.jpeg";
import img12 from "../assets/cafe_spots/12.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

function ListContainer() {
  const { businessData, isLoading, hasError } = useBusinessData();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";
  const sortOption = queryParams.get("sort") || "";

  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  useEffect(() => {
    if (!businessData) return;

    let businessesWithImages = businessData.map((business, index) => ({
      ...business,
      imageUrl: images[index % images.length],
    }));

    if (searchTerm.trim()) {
      businessesWithImages = businessesWithImages.filter((business) =>
        business.name.toLowerCase().includes(searchTerm)
      );
    }

    if (sortOption) {
      businessesWithImages.sort((a, b) => {
        if (sortOption === "top-reviews") {
          return b.rating - a.rating; 
        }
        if (sortOption === "price-ascending") {
          return a.price - b.price; 
        }
        if (sortOption === "price-descending") {
          return b.price - a.price; 
        }
        if (sortOption === "az") {
          return a.name.localeCompare(b.name); 
        }
        return 0;
      });
    }

    setFilteredBusinesses(businessesWithImages);
  }, [businessData, searchTerm, sortOption]);

  if (isLoading) return <p>Loading businesses...</p>;
  if (hasError) return <p>Error loading businesses.</p>;

  return (
    <div style={styles.pageContainer}>
      <SearchBox />
      <div style={styles.businessesContainer}>
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business, index) => (
            <div key={index} style={styles.businessCard}>
              <img src={business.imageUrl} alt={business.name} style={styles.businessImage} />
              <div style={styles.businessContent}>
                <h2 style={styles.businessTitle}>{business.name}</h2>
                <p style={styles.businessDescription}>
                  {business.description || "No description available"}
                </p>
                <p style={styles.businessAddress}>
                  <b>Address:</b> {business.road_name}, {business.city}
                </p>
                <p><b>Rating:</b> {business.rating}</p>
                <p><b>Price:</b> {business.price ? `$${business.price}` : "N/A"}</p>
              </div>
              <div style={styles.buttonContainer}>
                <HeartButton business={business} />
                <StarButton business={business} />
              </div>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No businesses found.</p>
        )}
      </div>
    </div>
  );
}
const styles = {

  businessesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '50%',
    maxWidth: '800px',
    padding: '0px',
    marginLeft:"300px",
    height:"400vh"
  },
  businessCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fafafa',
    cursor: 'pointer',
  
  },
  businessImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginRight: '15px',
  },
  businessContent: {
    flex: 1, 
  },
  businessTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  businessDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '5px',
  },
  businessAddress: {
    fontSize: '14px',
    color: '#777',
    
  },
  buttonContainer: {
    display: 'flex',
    gap: '10px',
    marginLeft: 'auto', 
  },
};
export default ListContainer;