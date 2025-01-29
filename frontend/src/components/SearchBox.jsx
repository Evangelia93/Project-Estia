import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import "../styles/modal.css";
import FilterModal from "./FilterModal";
import SortBy from "./SortBy";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortByModalOpen, setIsSortByModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const navigate = useNavigate();

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };

  const toggleSortByModal = () => {
    setIsSortByModalOpen((prev) => !prev);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (searchTerm.trim() !== "") {
      queryParams.set("search", searchTerm);
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.set(key, value);
      }
    });

    navigate(`/listcontainer?${queryParams.toString()}`);
  };

  return (
    <div className="searchbox-wrapper">
      <div className="searchbox-container">
        <input
          type="text"
          className="searchbox-input"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}        />
        <button className="searchbox-submit-button" onClick={handleSearch}>
          Submit
        </button>
      </div>

      <div className="filter-sort-container">
        <button className="filter-button" onClick={toggleFilterModal}>
          Filters
        </button>
        <button className="sort-button" onClick={toggleSortByModal}>
          Sort By
        </button>
      </div>

      {isFilterModalOpen && (
        <FilterModal
          onClose={toggleFilterModal}
          onApply={(appliedFilters) => {
            setFilters(appliedFilters);
            toggleFilterModal();
          }}
        />
      )}

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