// import React, { useState } from "react";
// import "reactjs-popup/dist/index.css";
// import "../styles/modal.css"; // Ίδιο στυλ με το FilterModal
// import FilterModal from "./FilterModal";
// import SortBy from "./SortBy";

// function SearchBox() {
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [isSortByModalOpen, setIsSortByModalOpen] = useState(false);

//   const toggleFilterModal = () => {
//     setIsFilterModalOpen((prev) => !prev);
//   };

//   const toggleSortByModal = () => {
//     setIsSortByModalOpen((prev) => !prev);
//   };

//   return (
//     <div className="searchbox-container">
//       <input
//         type="text"
//         className="searchbox-input"
//         placeholder="Search..."
//       />
//       <button className="searchbox-button" onClick={toggleFilterModal}>
//         Filters
//       </button>
//       <button className="searchbox-button" onClick={toggleSortByModal}>
//         Sort By
//       </button>

//       {/* Filter Modal */}
//       {isFilterModalOpen && (
//         <FilterModal
//           onClose={toggleFilterModal}
//           onApply={(filters) => {
//             console.log("Filters Applied:", filters);
//             toggleFilterModal();
//           }}
//         />
//       )}

//       {/* Sort By Modal */}
//       {isSortByModalOpen && (
//         <SortBy
//           onClose={toggleSortByModal}
//           onSort={(option) => {
//             console.log("Sort Option Selected:", option);
//             toggleSortByModal();
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default SearchBox;
import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import "../styles/modal.css"; // Ίδιο στυλ με το FilterModal
import FilterModal from "./FilterModal";
import SortBy from "./SortBy";

function SearchBox({ onSearch }) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortByModalOpen, setIsSortByModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const toggleSortByModal = () => {
    setIsSortByModalOpen((prev) => !prev);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm); // Στέλνουμε τον όρο αναζήτησης στο parent component
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbox-wrapper">
      <div className="searchbox-container">
        {/* Input για αναζήτηση */}
        <input
          type="text"
          className="searchbox-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {/* Κουμπί αναζήτησης */}
        <button className="searchbox-submit-button" onClick={handleSearch}>
          Submit
        </button>
      </div>
      {/* Κουμπιά Filter & Sort By */}
      <div className="filter-sort-container">
        <button className="filter-button" onClick={toggleFilterModal}>
          Filters
        </button>
        <button className="sort-button" onClick={toggleSortByModal}>
          Sort By
        </button>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <FilterModal
          onClose={toggleFilterModal}
          onApply={(filters) => {
            console.log("Filters Applied:", filters);
            toggleFilterModal();
          }}
        />
      )}

      {/* Sort By Modal */}
      {isSortByModalOpen && (
        <SortBy
          onClose={toggleSortByModal}
          onSort={(option) => {
            console.log("Sort Option Selected:", option);
            toggleSortByModal();
          }}
        />
      )}
    </div>
  );
}

export default SearchBox;