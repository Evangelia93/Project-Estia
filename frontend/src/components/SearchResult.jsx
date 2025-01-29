import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Businesses from './Businesses';

function SearchResults({ businessData }) {
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query');

    if (searchTerm) {
      // Φιλτράρει τις επιχειρήσεις βάσει του όρου αναζήτησης
      const filtered = businessData.filter((business) =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBusinesses(filtered);
    }
  }, [location.search, businessData]);

  return (
    <div>
      <div>
        {filteredBusinesses.length > 0 ? (
          <Businesses businesses={filteredBusinesses} />
        ) : (
          <p>No businesses found. Try another search term.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;