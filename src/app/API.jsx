import React, { useState } from "react";
import { fetchFood } from "../service/foodService";

const FoodApiComponent = () => {
  const [apiData, setApiData] = useState({});
  const [food, setFood] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const displayData = async () => {
    try {
      const res = await fetchFood(food, "en");
      const firstDish = res.dishes[0];

      if (firstDish) {
        setApiData({
          name: firstDish.name,
          caloric: firstDish.caloric,
          fat: firstDish.fat,
          protein: firstDish.protein,
        });
      } else {
        setApiData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToSearchHistory = () => {
    if (apiData.name) {
      setSearchHistory([...searchHistory, apiData]);
      setApiData({}); // Clear apiData after adding to search history
    }
  };

  const calculateTotalCalories = () => {
    return searchHistory.reduce((totalCalories, item) => totalCalories + parseFloat(item.caloric), 0);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-md">
      <div className="flex flex-col">
        <label htmlFor="searchFood" className="block text-sm font-medium text-gray-700">
          Search
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="food"
            id="FoodSearch"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
            placeholder="Food Search"
            onChange={(event) => setFood(event.target.value)}
          />
        </div>
        <button
          type="button"
          className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={displayData}
        >
          Search
        </button>
        {apiData.name && (
          <button
            type="button"
            className="mt-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={addToSearchHistory}
          >
            Add to list
          </button>
        )}
      </div>
      {apiData.name && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Results:</h2>
          <p className="mt-2">
            <span className="font-semibold">Name:</span> {apiData.name}
          </p>
          <p>
            <span className="font-semibold">Caloric Value:</span> {apiData.caloric}
          </p>
          <p>
            <span className="font-semibold">Fat:</span> {apiData.fat}
          </p>
          <p>
            <span className="font-semibold">Protein:</span> {apiData.protein}
          </p>
        </div>
      )}

      {searchHistory.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Food picked:</h2>
          <ul className="list-disc list-inside">
            {searchHistory.map((item, index) => (
              <li key={index}>
                {item.name}: {item.caloric}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total Calories: {calculateTotalCalories()}</p>
        </div>
      )}
    </div>
  );
};

export default FoodApiComponent;






