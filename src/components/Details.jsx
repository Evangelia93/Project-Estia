import { useEffect, useState } from 'react';
import { fetchAddresses, fetchBusinesses } from '../api/businesses';
import '../styles/home.scss'
import { Link, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import Map from './Map';
import SearchBox from './SearchBox';
import Modal from './Modal';



function Details() {
  const [addresses, setAddresses] = useState([]);
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  const [longitude, setLongitude] = useState(0)
  const [lattitude, setLatitude] = useState(0)
  const [street, setStreet] = useState('')

  const [isMapActive, setIsMapActive] = useState(false)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search")?.toLowerCase() || "";

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

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);;

  const toggleFilterModal = () => {
    setIsFilterModalOpen((prev) => !prev);
  };


  useEffect(() => {
    const fetchData = async () => {
      const addresses = await fetchBusinesses();
      setFilteredAddresses(addresses)
      if (searchTerm.trim()) {
        setFilteredAddresses(addresses.filter((address) =>
          address.name.toLowerCase().includes(searchTerm)
        ));
      } 
      console.log('ADRESSES: ', addresses);
    }

    fetchData();
  }, [searchTerm])

  if (!filteredAddresses || filteredAddresses.length == 0) {
    return (
      <>
        <SearchBox onClick={toggleFilterModal} />
        <i class="fa-solid fa-store-slash"></i>
        <p>No results</p>
      </>
    )
  }

  return (
    <>
      <SearchBox onClick={toggleFilterModal} />
      <Modal />
      <div className="addresses-wrapper">
        <div className="addresses-container">
          {filteredAddresses.map((address) => (
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