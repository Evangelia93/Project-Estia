import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './Map.module.css';

// const defaultLocation = [50.8503, 4.3517]


function Map({ combinedData, selectedLocation, setCurrentIndex }) {

  useEffect(() => {
    let map;
  
    if (!map) {

      const firstValidLocation = combinedData.find(item => item?.latitude && item?.longitude);
      const initialLocation = selectedLocation || 
        (firstValidLocation ? [firstValidLocation.latitude, firstValidLocation.longitude] : [48.8566, 2.3522]);
      
      map = L.map('map').setView(initialLocation, selectedLocation ? 18 : 6);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    }
    

    combinedData.forEach((item, index) => {
      if (!item || !item.latitude || !item.longitude) return;

      const {
        latitude,
        longitude,
        name,
        description,
        road_name,
        city,
      } = item;

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

      marker.on('click', () => {
        if (setCurrentIndex) {
          setCurrentIndex(index);
        }
        map.setView([latitude, longitude], 15);
      });
    });
  
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [combinedData, selectedLocation, setCurrentIndex]);

  return <div id="map" className={styles.map}></div>;
}

export default Map;