
const API_BASE_URL = 'https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1';

export const fetchBusinesses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/business/`);
      if (!response.ok) throw new Error('Failed to fetch businesses');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching businesses:', error);
      return [];
    }
  };

export const fetchAddresses = async () => {
  const response = await fetch(`${API_BASE_URL}/address/`);
  return response.json();
};

export const fetchReviews = async (businessId) => {
  try {
    const response = await fetch(
      `https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1/business/${businessId}/business_features`
    );
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return await response.json();
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};
export const submitReview = async (userId, businessId, reviewText, rating) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/add_review/${businessId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review: reviewText, rating }),
    });

    if (!response.ok) throw new Error("Failed to submit review");

    return await response.json();
  } catch (error) {
    console.error("Error submitting review:", error);
    return null;
  }
};