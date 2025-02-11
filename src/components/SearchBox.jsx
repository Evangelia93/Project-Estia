import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import FilterModal from "./FilterModal";
import { useNavigate } from "react-router-dom";
import SortBy from "./SortBy";

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

    navigate(`/search/?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="searchbox-wrapper">
        <div className="searchbox-container">
          <input
            type="text"
            className="searchbox-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} />
          <button type="submit" className="searchbox-submit button" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
      
      <hr className="searchbox-separator"/>

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
    </>
  );
}

export default SearchBox;