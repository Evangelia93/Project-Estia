import React from 'react';

const SortBy = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-by-container">
      <label htmlFor="sort-by">Sort By:</label>
      <select id="sort-by" name="sort-by" onChange={handleSortChange}>
        <option value="top-reviews">Top Reviews</option>
        <option value="price-ascending">Price Ascending</option>
        <option value="price-descending">Price Descending</option>
        <option value="az">A-Z</option>
      </select>
    </div>
  );
};

export default SortBy;
