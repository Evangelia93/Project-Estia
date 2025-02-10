import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './Map.module.css';

// const defaultLocation = [50.8503, 4.3517]


function Map({ longitude, latitude }) {

    useEffect(() => {
        let map;

        if (!map) {
            map = L.map('map').setView([latitude, longitude], 19);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);

            console.log('LONGITUDE : ', longitude)
            console.log('LATITUDE : ', latitude)

            const marker = L.marker([latitude, longitude]).addTo(map).bindPopup(`${longitude}, ${latitude}`).openPopup();

        }
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, [longitude, latitude]);

    return (
        <div className="leaflet-map">
            <div id="map" className={styles.map} style={{ height: '300px' }}></div>
        </div>
    )
}

export default Map;