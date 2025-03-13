import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import Error from './components/ErrorMsg.jsx'
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {updateUserPlaces, fetchUserPlaces} from './http.js'

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error,setError] = useState();

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }


  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
      
    });

    try{
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    }
    catch(e){
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message : e.message || 'Failed to Update places.'})
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try{
      await updateUserPlaces(
        userPlaces.filter((place) => {
          place.id !== selectedPlace.current.id;
        })
      )
    }

    catch(e){
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message : e.message || 'Failed to delete place'})
    }

    setModalIsOpen(false);
  }, []);

  useEffect(() => {
    const handleUserPlaces = async () => {
      setIsFetching(true);
      try{
        let placesData =  await fetchUserPlaces();
        setUserPlaces(placesData);
      }
      catch(e){
        setErrorUpdatingPlaces({message : e.message || "Failed to fetch user places."})
      }
      setIsFetching(false);
    }

    handleUserPlaces();
  },[])

  const handleError = () => {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
       { errorUpdatingPlaces &&  <Error 
          title="An error Occurred"
          message={errorUpdatingPlaces.message}
          onConfirm={handleError}
        />
       }
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
      {
        error && <Error title="An error Occurred" message={error.message}/> 
      }
        {!error && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isFetching}
          loadingText="Fetch Your Places..."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        }
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
