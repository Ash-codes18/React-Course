import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorMsg from './ErrorMsg.jsx'
import {sortPlacesByDistance} from '../loc.js'
import {fetchAvailablePlaces} from '../http.js'

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces,setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error,setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () =>{
      setIsFetching(true);
      
      try{
        
        const placesData = await fetchAvailablePlaces()
        navigator.geolocation.getCurrentPosition((position) =>{
          const sortedPlaces = sortPlacesByDistance(
            placesData,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvailablePlaces(sortedPlaces || []);
          setIsFetching(false);
        });

      }
      catch(e){
        setError({message:e.message || 'Could not fetch places please try again later'});
        setIsFetching(false);
      }
      
    }

    fetchPlaces();
  }, [])

  if(error){
    return(
      <ErrorMsg title = "An Error Occurred" message={error.message}/>
    )
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading = {isFetching}
      loadingText = "Loading Places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
