import React, { useState, useEffect, useContext } from "react";
// import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
// import Forcast from "./forcast";
// import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
import { CityContext } from "../src/context/weatherContext";
import { dummyDayDataAll, dummyWeekDataAll } from "../constants/sampleData";

import Mumbai from "../images/Mumbai.jpg";
import Delhi from "../images/Delhi.jpg";
import Kolkata from "../images/Kolkata.jpg";
import Bangalore from "../images/Bangalore.jpg";
import Hyderabad from "../images/Hyderabad.jpg";
import Chennai from "../images/Chennai.jpg";
import CityBackground from "./CityBackground";

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  icon: "WIND",
  color: "white",
  size: 112,
  animate: true,
};

function timeSinceFetchedFun(unixTimestamp) {
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  const secondsElapsed = now - unixTimestamp;

  // Define time units
  const timeUnits = [
    { unit: "year", seconds: 31536000 }, // 365 days
    { unit: "month", seconds: 2592000 }, // 30 days
    { unit: "day", seconds: 86400 }, // 1 day
    { unit: "hour", seconds: 3600 }, // 1 hour
    { unit: "minute", seconds: 60 }, // 1 minute
    { unit: "second", seconds: 1 }, // 1 second
  ];

  for (const { unit, seconds } of timeUnits) {
    const interval = Math.floor(secondsElapsed / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now"; // For cases when it's less than a second ago
}

const MainCard = (props) => {
  const [main, setMain] = useState("Rain");
  const { city, setCity, weekData, setWeekData, todayData, setTodayData } =
    useContext(CityContext);

  const { isModalOpen, toggleModal, setIsModalOpen } = props;

  const [lastTimeFetch, setLastTimeFetch] = useState(0);
  const [timeSinceFetched, setTimeSinceFetched] = useState("");
  const [currentData, setCurrentData] = useState({});

  const { unit, setUnit } = useContext(CityContext); // 'C' for Celsius, 'F' for Fahrenheit, 'K' for Kelvin

  // Function to convert temperature based on selected unit
  const convertTemperature = (tempC, unit) => {
    switch (unit) {
      case "F":
        return (tempC * 9) / 5 + 32; // Celsius to Fahrenheit
      case "K":
        return tempC + 273.15; // Celsius to Kelvin
      default:
        return tempC; // Celsius
    }
  };

  const toggleUnit = () => {
    if (unit === "C") {
      setUnit("F");
    } else if (unit === "F") {
      setUnit("K");
    } else {
      setUnit("C");
    }
  };

  const condtionToIcon = (condition) => {
    switch (condition) {
      case "Rain":
        return "RAIN";
      case "Haze":
        return "CLEAR_DAY";
      case "Drizzle":
        return "SLEET";
      case "Thunderstorm":
        return "WIND";
      case "Clouds":
        return "CLOUDY";
      case "Mist":
        return "FOG";
      default:
        return "CLEAR_DAY";
    }
  };
  const host = import.meta.env.VITE_SERVER_URL ||"https://main-weather-server.onrender.com";


  const getWeather = async () => {
    const api_call = await fetch(`${host}/weather/todayData`);
    const data = await api_call.json();
    return data;
  };

  const getWeekWeather = async () => {
    const api_call = await fetch(`${host}/weather/last7days`);
    const data = await api_call.json();
    return data;
  };

  const getCurrentData = async () => {
    const api_call = await fetch(
      `${host}/weather/getCurrentData`
    );
    const data = await api_call.json();
    return data;
  };

  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);

    const tempData = getCurrentData();

    // Reset the rotation state after the animation completes
    setTimeout(() => {
      setIsRotating(false);
      setCurrentData(tempData);
      setLastTimeFetch(tempData.timestamp);
    }, 1000); // Match this duration to the CSS animation duration
  };

  useEffect(() => {
    // setWeekData(dummyWeekDataAll);

    // Define an async function to fetch the weather data
    const fetchTodayData = async () => {
      const tempTodayData = await getWeather(); // Wait for the data to be fetched
      setTodayData(tempTodayData); // Set the fetched data
      setLastTimeFetch(
        todayData[city]?.[todayData[city].length - 1]?.timestamp
      );
      setCurrentData(todayData[city]?.[todayData[city].length - 1]);
      const tempWeekData = await getWeekWeather();
      setWeekData(tempWeekData);
    };
    // console.log(todayData)
    fetchTodayData(); // Call the async function
  }, []);

  useEffect(() => {
    // Initial update
    setTimeSinceFetched(timeSinceFetchedFun(lastTimeFetch));

    const intervalId = setInterval(() => {
      setTimeSinceFetched(timeSinceFetchedFun(lastTimeFetch));
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup function to clear the interval
    return () => clearInterval(intervalId);
  }, [lastTimeFetch]);

  //   useEffect(() => {

  //     const timerID = setInterval(() => {
  //       if (lat && lon) {
  //         getWeather(lat, lon);
  //       }
  //     }, 600000);

  //     return () => clearInterval(timerID); // Clean up the interval on component unmount
  //   }, [lat, lon]); // Dependency array to re-run effect when lat or lon changes

  const cityImages = {
    Mumbai,
    Delhi,
    Kolkata,
    Bangalore,
    Hyderabad,
    Chennai,
  };

  return (
    <React.Fragment>
      <CityBackground city={city}>
        <div className="title">
          <h2>{city}</h2>
          <h3>INDIA</h3>
          <div className="flex flex-col my-auto mx-auto">
            <h5>Last fetched {timeSinceFetched}</h5>
            <button
              onClick={handleClick}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                marginLeft: "10px",
                position: "relative",
                textAlign: "right",
              }}
              aria-label="Reload"
            >
              <i
                className={`fas fa-sync mt-0 ${isRotating ? "rotating" : ""}`}
                style={{ fontSize: "15px", color: "#007BFF" }}
              ></i>
            </button>
          </div>
        </div>
        <div className="mb-icon">
          <ReactAnimatedWeather
            icon={condtionToIcon(
              todayData[city]?.[todayData[city].length - 1]?.condition ??
                "No data"
            )}
            color={defaults.color}
            size={defaults.size}
            animate={defaults.animate}
          />
          <p>
            {todayData[city]?.[todayData[city].length - 1]?.condition ??
              "No data"}
          </p>
          <div className="flex flex-col my-2">
            <span>
              Humidity:{" "}
              {todayData[city]?.[todayData[city].length - 1]?.humidity ??
                "No data"}
              %
            </span>
            <span>
              Wind Speed:{" "}
              {todayData[city]?.[todayData[city].length - 1]?.wind_speed ??
                "No data"}{" "}
              mph
            </span>
          </div>
        </div>
        <div className="date-time">
          <div className="dmy">
            <div id="txt"></div>
            <div className="current-time">
              <Clock format={"HH:mm:ss"} interval={1000} ticking={true} />
            </div>
            <div className="current-date">{dateBuilder(new Date())}</div>
          </div>
          <div
            className="temperature"
            onClick={toggleUnit}
            style={{ cursor: "pointer" }}
          >
            <p>
              {Math.round(
                convertTemperature(
                  todayData[city]?.[todayData[city].length - 1]?.temperature ??
                    "No data",
                  unit
                )
              )}
              {unit !== "K" && "°"}
              {unit == "K" && " "}
              <span>{unit}</span>
            </p>
            <small>Click to change unit</small> {/* Optional, for better UX */}
          </div>
          <div
            className="flex absolute w-full"
            style={{ textAlign: "right", flexDirection: "column" }}
          >
            <p>Feels Like</p>
            <span className="text-3xl">
              <p>
                {Math.round(
                  convertTemperature(
                    todayData[city]?.[todayData[city].length - 1]?.feels_like ??
                      "No data",
                    unit
                  )
                )}
                {unit !== "K" && "°"}
                {unit == "K" && " "}
                <span className="text-2xl">{unit}</span>
              </p>
            </span>
          </div>
        </div>
      </CityBackground>

      {/* <Forcast icon={icon} weather={main} /> */}
    </React.Fragment>
  );
};

export default MainCard;
