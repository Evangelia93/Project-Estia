const fetchBusinesses = async () => {
  const API_BASE_URL = "https://estiaproject-b3ef95234cdd.herokuapp.com/api/v1";

  try {
    const response = await fetch(`${API_BASE_URL}/business/`);
    if (!response.ok) throw new Error("Failed to fetch businesses");
    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return [];
  }
};

fetchBusinesses();
