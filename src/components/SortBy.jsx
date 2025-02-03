import React from "react";
import "../styles/modal.css"; 

function SortBy({ onClose, onSort }) {
  return (
    <div className="modal">
      <div className="modal-content small-modal">
        <span onClick={onClose} className="close">
          &times;
        </span>
        <h4>Sort Options</h4>
        <ul className="popup-content-list">
          <li
            onClick={() => {
              onSort("top-reviews");
              onClose();
            }}
          >
            Top Reviews
          </li>
          <li
            onClick={() => {
              onSort("price-ascending");
              onClose();
            }}
          >
            Price Ascending
          </li>
          <li
            onClick={() => {
              onSort("price-descending");
              onClose();
            }}
          >
            Price Descending
          </li>
          <li
            onClick={() => {
              onSort("az");
              onClose();
            }}
          >
            A-Z
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortBy;