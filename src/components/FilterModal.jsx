import React, { useState } from "react";
import "../styles/modal.css";
import RatingBar from "./RatingBar";
import FilterCheckboxes from "./CheckBoxesFilter";

function FilterModal({ onClose, onApply }) {
  const initialFilters = {
    postalCode: "",
    rating: 0,
    checkboxes: {
      breakfast: false,
      lunch: false,
      brunch: false,
      dinner: false,
      cafe: false,
      indoorPlayground: false,
      outdoorPlayground: false,
      animators: false,
      petsAllowed: false,
      parking: false,
      wheelchairAccessibility: false,
    },
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleReset = () => {
    setFilters(initialFilters); 
  };

  const handleCheckboxChange = (updatedCheckboxes) => {
    setFilters((prev) => ({
      ...prev,
      checkboxes: updatedCheckboxes,
    }));
  };

  return (
    <div className="modal">
      <div className="modal-content small-modal">
        <span onClick={onClose} className="close">
          &times;
        </span>
        <h4>Filter Options</h4>

        <div>
          <RatingBar
            rating={filters.rating}
            onRate={(rating) => setFilters((prev) => ({ ...prev, rating }))}
          />
        </div>

        <hr />

        <label htmlFor="postal_code">Postal Code:</label>
        <select
          id="postal_code"
          name="postal_code"
          value={filters.postalCode}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, postalCode: e.target.value }))
          }
        >
          <option value="">Select Postal Code</option>
          <option value="1000">1000</option>
          <option value="1030">1030</option>
          <option value="1050">1050</option>
          <option value="1090">1090</option>
        </select>

        <hr />

        <FilterCheckboxes
          values={filters.checkboxes}
          onChange={handleCheckboxChange}
        />

        <hr />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => onApply(filters)} className="apply-button">
            Apply
          </button>
          <button onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;