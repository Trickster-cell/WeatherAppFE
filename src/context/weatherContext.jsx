import React, { createContext, useState } from "react";

// Create the context
export const CityContext = createContext();

// Create a provider component
export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("Delhi");
  const [mode, setMode] = useState("Today");
  const [unit, setUnit] = useState("C");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    subscribedCitys: [],
    minTemp: 0,
    maxTemp: 45,
    minHumidity: 20,
    maxHumidity: 95,
    minWindSpeed: 0,
    maxWindSpeed: 25,
  });

  // Function to toggle modal visibility

  const [todayData, setTodayData] = useState("");
  const [weekData, setWeekData] = useState("");

  return (
    <CityContext.Provider
      value={{
        city,
        setCity,
        mode,
        setMode,
        unit,
        setUnit,
        todayData,
        setTodayData,
        weekData,
        setWeekData,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
