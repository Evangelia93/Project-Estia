import React, { useState } from 'react';
import "../styles/styles.css"


function StarButton({ business }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
    return (
      <div>
        <button className="star-button" onClick={toggleModal}>
          ⭐ 
        </button>
  
        {/* Modal For Reviews */}
        {isModalOpen && (
          <div className="review-modal">
            <div className="modal-content">
              <h2>Reviews for {business.name}</h2>
              <ul>
                {business.reviews?.length ? (
                  business.reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                  ))
                ) : (
                  <p>No reviews yet.</p>
                )}
              </ul>
              <button className="close-button" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default StarButton;