import { useEffect, useState } from 'react';
import { fetchAddresses, fetchBusinesses } from '../api/businesses';
import '../styles/home.scss'
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Map from './Map';

function Details() {
  const [addresses, setAddresses] = useState([]);

  const [longitude, setLongitude] = useState(0)
  const [lattitude, setLatitude] = useState(0)
  const [street, setStreet] = useState('')


  const [isMapActive, setIsMapActive] = useState(false)

  const seedLocation = (long, lat, address) => {
    setLongitude(long)
    setLatitude(lat)
    setStreet(address)

    toggleModal();
  }

  const toggleModal = () => {
    setIsMapActive(!isMapActive)

    if (!isMapActive) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
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
              <div className="card-img-container" onClick={() => seedLocation(
                      address.longitude,
                      address.latitude,
                      `${address.number}, ${address.road_name}, ${address.postal_code} ${address.city}`)}>
                <div className="card-hover-info"></div>
                <img className='card-img' src={address.image_path} alt="" />
              </div>
              <div className="card-infos-container">
                <Link className="card-name"
                  onClick={() =>
                    seedLocation(
                      address.longitude,
                      address.latitude,
                      `${address.number}, ${address.road_name}, ${address.postal_code} ${address.city}`)}>{address.name}</Link>
                <p className="card-address">
                  <i className="fa-solid fa-location-dot"></i> {`${address.number}, ${address.road_name}`}</p>
                <p className="card-city">
                  {`${address.postal_code}, ${address.city}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isMapActive ?
        <div className="map-modal-container">
          <div className="map-modal-bg" onClick={() => toggleModal()}></div>
          <div className="map-modal">
            <Map longitude={longitude} latitude={lattitude} street={street} />
          </div>
        </div> : null}
    </>

  )
}

export default Details;