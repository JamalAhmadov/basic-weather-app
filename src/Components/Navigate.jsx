import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  return (
    <div className="w-80 h-9 mb-10 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-3xl">
      <ul className="w-full flex justify-evenly text-xl font-semibold">
        <li
          className={`cursor-pointer ${currentPath === "/" ? "text-blue-500" : ""}`}
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className={`cursor-pointer ${currentPath === "/favorites" ? "text-blue-500" : ""}`}
          onClick={() => navigate("/favorites")}
        >
          Saved
        </li>
      </ul>
    </div>
  );
};

export default Navigate;
