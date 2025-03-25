const BASE_URL = "http://localhost:3000"

export const getMeals = async() => {
    const response = await fetch(`${BASE_URL}/meals`);
    if(!response.ok){
        throw "Error Fetching Meals Data.";
    }
    const resData = response.json();
    return resData;
}