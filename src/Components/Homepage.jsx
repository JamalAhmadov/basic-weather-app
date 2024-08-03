import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Citycard from "./Citycard";
import Navigate from "./Navigate";

const Homepage = () => {
  const [city, setCity] = useState("baku");
  const [data, setData] = useState({});

  const getData = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_API_KEY
        }`
      );
      const result = await res.json();

      const { icon } = result.weather[0];
      const { humidity, temp } = result.main;
      const { speed: windSpeed } = result.wind;

      setData({
        humidity,
        windSpeed,
        temperature: Math.floor(temp-1),
        location: result.name,
        icon: icon, 
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    getData();
  }, [city]); 

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-slate-400 py-20">
      <Navigate />
      <div>
        <div className="flex m-2">
          <input
            className="w-full px-4 py-1 rounded-l-full outline-none"
            type="text"
            placeholder="Search.."
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="w-10 h-9 flex items-center justify-center bg-white rounded-r-full"
            onClick={getData}
          >
            <IoIosSearch />
          </button>
        </div>
        <Citycard data={data}  />
      </div>
    </div>
  );
};

export default Homepage;
