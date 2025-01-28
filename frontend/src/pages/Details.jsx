import { useState } from 'react';

import Map from '../components/Map';
import Slideshow from '../components/Slideshow';
import SearchBox from '../components/SearchBox';


function Details({ combinedData }) {
  const [currentIndex, setCurrentIndex] = useState(null)

  return (
    <>
    <SearchBox/>
      <div className="App">
        <Slideshow
          combinedData={combinedData}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        {!!combinedData && <Map
          selectedLocation={currentIndex ? [combinedData[currentIndex].latitude, combinedData[currentIndex].longitude] : null}
          setCurrentIndex={setCurrentIndex}
          combinedData={combinedData}
        />}
      </div>
    </>
  );
}

export default Details;
