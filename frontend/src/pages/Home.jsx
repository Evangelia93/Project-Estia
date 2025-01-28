import { useState } from "react";
import Businesses from "../components/Businesses.jsx";
import { useBusinessData } from "../hooks/useBusinessData.jsx";
import FilterModal from "../components/FilterModal.jsx";
import SearchBox from "../components/SearchBox.jsx";
import PopularCategories from "../components/PopularCategories.jsx";
import MapContainer from "../components/MapContainer.jsx";
import Map from "../components/Map/index.jsx";
import "../styles/styles.css"

function Home({ businessData }) {
  console.log("Business Data:", businessData);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [feedbackMessage, setFeedbackMessage] = useState("");

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const handleApplyFilters = () => {
    setFeedbackMessage("Filters applied!");
    setTimeout(() => setFeedbackMessage(""), 3000); 
    toggleFilterModal(); 

  };

  return (
    <div>
      <SearchBox onClick={toggleFilterModal} />
      <PopularCategories />
      <div className="content-container">
        <div className="left-content">
          <Businesses businesses={businessData} />
        </div>
        <div className="right-content">
        
          {/* <MapContainer /> */}
        </div>
      </div>
      
      {isFilterModalOpen && (
        <FilterModal
          onClose={toggleFilterModal}
          onApply={handleApplyFilters}
        />
      )}

      {feedbackMessage && (
        <div className="feedback-message">
          {feedbackMessage}
        </div>
      )}
    </div>
  );
}

export default Home;