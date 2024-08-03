import React, { useState, useEffect } from "react";
import { WiHumidity } from "react-icons/wi";
import { TiWeatherWindy } from "react-icons/ti";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const Citycard = ({ data }) => {
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const icon = allIcons[data.icon] || clear_icon;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const alreadyExists = favorites.some((item) => item.name === data.location);
    setIsFavorite(alreadyExists);
  }, [data.location]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((item) => item.name !== data.location);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(false);
      toast.success("Removed from list");
    } else {
      if (favorites.length >= 3) {
        toast.error("Maximum 3 cities can be added...");
      } else {
        favorites.push({ name: data.location });
        localStorage.setItem("favorites", JSON.stringify(favorites));
        setIsFavorite(true);
        toast.success("Added to list");
      }
    }
  };

  return (
    <div className="w-72 h-96 py-5 px-4 flex flex-col items-center bg-gradient-to-tl from-indigo-500 to-blue-400 rounded-md p-4 text-white relative">
      <div
        className="w-5 h-5 flex items-center justify-center font-bold text-2xl cursor-pointer absolute top-1 right-1"
        onClick={toggleFavorite}
      >
        {isFavorite ? <FaBookmark size={19} /> : <CiBookmark size={22} />}
      </div>
      <img className="w-24 mb-7" src={icon} alt="" />
      <h1 className="font-semibold text-4xl">{data.temperature} °C</h1>
      <h1 className="font-medium text-2xl mb-20">{data.location}</h1>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <WiHumidity size={25} />
          <div>
            <p className="text-sm">{data.humidity} %</p>
            <p className="text-xs">Humidity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TiWeatherWindy size={25} />
          <div>
            <p className="text-sm">{data.windSpeed} Km/h</p>
            <p className="text-xs">Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citycard;
