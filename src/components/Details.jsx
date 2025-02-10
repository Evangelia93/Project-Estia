import { useEffect, useState } from 'react';
import { fetchAddresses, fetchBusinesses } from '../api/businesses';
import '../styles/home.scss'
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Map from './Map';

function Details({ combinedData }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const [longitude, setLongitude] = useState(0)
  const [lattitude, setLatitude] = useState(0)

  const seedLocation = (long, lat) => {
    setLongitude(long)
    setLatitude(lat)

    console.log('LONGITUDE : ', long)
    console.log('LATITUDE : ', lat)
  }

  useEffect(() => {
    const fetchData = async () => {
      const addresses = await fetchBusinesses();
      setAddresses(addresses);
      console.log('ADRESSES: ', addresses);
    }

    fetchData();
  }, [])

  return (
    <>
      <div className="addresses-wrapper">
        <div className="addresses-container">
          {addresses.map((address) => (
            <div key={address.id} className="addresses-card">
              <div className="card-img-container">
                <img className='card-img' src={address.image_path} alt="" />
              </div>
              <div className="card-infos-container">
                <Link className="card-name" onClick={() => seedLocation(address.longitude, address.latitude)}>{address.name}</Link>
                {/* <p className="card-desc">{address.description}</p> */}
                <p className="card-address">
                  <i className="fa-solid fa-location-dot"></i> {`${address.number}, ${address.road_name}`}</p>
                <p className="card-city">
                  {`${address.postal_code}, ${address.city}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Map
        longitude={longitude}
        latitude={lattitude} />
    </>

  )
}

export default Details;