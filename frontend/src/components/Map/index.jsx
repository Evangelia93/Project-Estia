import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from '../Map/Map.module.css';

const defaultLocation = [50.8503, 4.3517]
// eslint-disable-next-line react/prop-types
function Map({ combinedData, selectedLocation, setCurrentIndex }) {

  useEffect(() => {
    let map;
  
    if (!map) {
      map = L.map('map').setView(selectedLocation ?? defaultLocation, selectedLocation ? 18 : 12);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    }


    // Προσθήκη markers στον χάρτη
    // eslint-disable-next-line react/prop-types
    combinedData.forEach((item, index) => {
      const {
        latitude,
        longitude,
        name,
        description,
        road_name,
        city,
      } = item;

      if (latitude && longitude) {
        const popupContent = `
          <div>
            <h3>${name}</h3>
            <p>${description}</p>
            <p><b>Address:</b> ${road_name}, ${city}</p>
          </div>
        `;
        const marker = L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(popupContent);

        // Συνδέουμε το marker με το αντίστοιχο slide
        marker.on('click', () => {
          if (setCurrentIndex) {
            setCurrentIndex(index);
          }
          map.setView([latitude, longitude], 15);
        });
      } else {
        console.error('Invalid coordinates for business:', item);
      }
    });
  
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [combinedData, selectedLocation, setCurrentIndex]);

  return <div id="map" className={styles.map}></div>;
};


export default Map;