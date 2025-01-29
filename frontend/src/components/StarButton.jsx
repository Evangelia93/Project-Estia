import React, { useState, useEffect } from "react";
import "../styles/styles.css";

function StarButton({ business, userId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      fetch(`https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1/business/${business.id}/business_features`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched Data from API:", data); 
          if (data.reviews?.length) {
            setReviews(data.reviews);
          } else {
            console.warn("No reviews found in API response, adding mock review.");
            setReviews([{ text: "Great place! My kids loved it.", rating: 5, helpful: 0, notHelpful: 0 }]); 
          }
        })
        .catch((error) => console.error("Error fetching reviews:", error));
    }
  }, [isModalOpen, business.id]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1/users/${userId}/add_review/${business.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ review: newReview, rating }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setReviews((prevReviews) => [
        ...prevReviews,
        { text: newReview, rating, helpful: 0, notHelpful: 0 },
      ]);

      setNewReview("");
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHelpfulClick = (index, type) => {
    const updatedReviews = [...reviews];
    if (type === "helpful") {
      updatedReviews[index].helpful += 1;
    } else {
      updatedReviews[index].notHelpful += 1;
    }
    setReviews(updatedReviews);
  };

  return (
    <div>
      <button className="star-button" onClick={toggleModal}>
        ⭐
      </button>

      {isModalOpen && (
        <div className="review-modal">
          <div className="modal-content">
            <h2>Reviews for {business.name}</h2>
            
            <div className="reviews-container">
              {reviews.length ? (
                reviews.map((review, index) => (
                  <div key={index} className="review-box">
                    <p><strong>⭐ {review.rating}/5</strong></p>
                    <p>{review.text}</p>
                    
                    <div className="helpful-container">
                      <span>Helpful:</span>
                      <button 
                        className="thumbs-up" 
                        onClick={() => handleHelpfulClick(index, "helpful")}
                      >
                        👍 {review.helpful}
                      </button>
                      <button 
                        className="thumbs-down" 
                        onClick={() => handleHelpfulClick(index, "notHelpful")}
                      >
                        👎 {review.notHelpful}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>

            <h4>Add a Review</h4>
            <form onSubmit={handleSubmitReview}>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write your review..."
                required
              />
              <label>
                Rating:
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </form>

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