import { useState } from "react";
import FilterModal from "../components/FilterModal.jsx";
import SearchBox from "../components/SearchBox.jsx";
import PopularCategories from "../components/PopularCategories.jsx";
import Details from "../components/Details.jsx";
import "../styles/styles.css";


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
      {/* Προσθήκη του Details κάτω από τις κατηγορίες */}
      {businessData && businessData.length > 0 ? (
        <Details combinedData={businessData} />
      ) : (
        <p>No businesses found</p> // Αν δεν υπάρχουν δεδομένα
      )}

      {isFilterModalOpen && (
        <FilterModal
          onClose={toggleFilterModal}
          onApply={handleApplyFilters}
        />
      )}

      {feedbackMessage && (
        <div className="feedback-message">{feedbackMessage}</div>
      )}
    </div>
  );
}

export default Home;