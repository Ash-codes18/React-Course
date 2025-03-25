import React, { useState, useEffect } from "react";
import { getMeals } from "./http.js";

const Meals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const fetchMeals = async () => {
      try {
        const mealData = await getMeals();
        console.log(mealData);
        setAvailableMeals(mealData);
        setIsFetching(false);
      } catch (e) {
        console.log(e);
        setIsFetching(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <>
      {isFetching &&
        <p>Loading Available Meal Options</p>
      }
            <ul id="meals">
          {!isFetching && availableMeals &&
            availableMeals.map((mealItems) => (
                <article key={mealItems.id}>
              <li className="meal-item">
                  <img
                    src={`http://localhost:3000/${mealItems.image}`}
                    alt={`${mealItems.name} photo`}
                  />
                  <h3>{mealItems.name}</h3>
                  <div className="meal-item-price">${mealItems.price}</div>
                  <div className="meal-item-description">
                    {mealItems.description}
                  </div>
                  <button className="meal-item-actions button">Add to Cart</button>
                </li> 
                </article>    
            ))}
                </ul>
    </>
  );
};

export default Meals;
