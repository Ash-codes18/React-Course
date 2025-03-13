const BASE_URL = 'http://localhost:3000';

export const fetchAvailablePlaces = async() => {
    const response = await fetch(`${BASE_URL}/places`)
    if(!response.ok){
        throw new Error('Failed to fetch Places.');
    }
    const resData = await response.json();
    return resData.places;
}

export const fetchUserPlaces = async() => {
    const response = await fetch(`${BASE_URL}/user-places`);
    if(!response.ok){
        throw new Error('Failed to fetch User Places.');
    }

    const resData = await response.json();
    return resData.places;
}

export const updateUserPlaces = async(places) => {
    const response = await fetch(`${BASE_URL}/user-places`,{
        method : 'PUT',
        body : JSON.stringify({places : places}),
        headers : {
            'Content-Type' : 'application/json'
        }
     })

     if(!response.ok){
        throw new Error('Failed to update user Data.')
     }

     const resData = await response.json();

     return resData.message;
}