import { useState } from "react";
import FilterModal from "../components/FilterModal.jsx";
import SearchBox from "../components/SearchBox.jsx";
import PopularCategories from "../components/PopularCategories.jsx";
import Details from "../components/Details.jsx";
import "../styles/styles.css";
import Modal from "../components/Modal.jsx";


function Home({ businessData }) {

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  return (
    <div>
      {businessData && businessData.length > 0 ? (
        <Details />
      ) : (
        <p>No businesses found</p>
      )}

      {feedbackMessage && (
        <div className="feedback-message">{feedbackMessage}</div>
      )}
    </div>
  );
}

export default Home;