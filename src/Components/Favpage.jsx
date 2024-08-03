import React, { useEffect, useState } from "react";
import Navigate from "./Navigate";
import Citycard from "./Citycard";

const Favpage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getDataForCities = async () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length === 0) {
      setError("No favorite cities found.");
      return;
    }
    try {
      const promises = favorites.map((city) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=${
            import.meta.env.VITE_APP_API_KEY
          }`
        ).then((res) => res.json())
      );

      const results = await Promise.all(promises);

      const dataForAllCities = results.map((result) => {
        const { icon } = result.weather[0];
        const { humidity, temp } = result.main;
        const { speed: windSpeed } = result.wind;

        return {
          humidity,
          windSpeed,
          temperature: Math.floor(temp-1),
          location: result.name,
          icon: icon, // Use the raw icon code
        };
      });

      setData(dataForAllCities);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch weather data.");
    }
  };

  useEffect(() => {
    getDataForCities();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-slate-400 py-20">
      <Navigate />
      {error ? (
        <p>{error}</p>
      ) : data.length === 0 ? (
        <p>No favorite cities to display.</p>
      ) : (
        <div className="flex gap-3 flex-wrap w-full justify-center">
          {data.map((cityData, index) => (
            <Citycard key={index} data={cityData} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favpage;
