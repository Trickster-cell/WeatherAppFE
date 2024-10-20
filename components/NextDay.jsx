import rainy1 from "../animated/day.svg";
import night from "../animated/night.svg";
import rainy2 from "../animated/rainy-2.svg";
import rainy3 from "../animated/rainy-4.svg";
import rainy4 from "../animated/rainy-5.svg";
import rainy5 from "../animated/rainy-6.svg";
import thunder from "../animated/thunder.svg";
import cloudy from "../animated/cloudy.svg";
import mist from "../animated/cloudy-day-3.svg";
import nightmist from "../animated/cloudy-night-3.svg";

import React, { useContext, useEffect, useState } from "react";
import { CityContext } from "../src/context/weatherContext";

function convertUnixToDateTimeString(unixTimestamp) {
  // Create a new Date object from the Unix timestamp (in milliseconds)
  const date = new Date(unixTimestamp * 1000);

  // Convert to IST by adding 5 hours and 30 minutes
  date.setTime(date.getTime() + 5.5 * 60 * 60 * 1000);

  // Extract date components
  const month = date.getUTCMonth() + 1; // getUTCMonth() returns 0-11
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Extract time components
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // console.log(hours)

  // Format the result
  return `${month}/${day}/${year} ${
    hours < 10 ? "0" : ""
  }${hours}:${minutes} ${ampm}`;
}

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

export default function NextDay({
  temp = 25,
  feels_like = 20,
  humidity = 10,
  timestamp = 1729230182,
  condition = "Haze",
  wind = 12,

  avg_prev = 26,
  high_prev = 30,
  low_prev = 24,
  max_humid = 12,
  min_hum = 2,
  avg_wind = 5,
  date = "2024-10-17T18:30:00.000Z",
}) {
  const [image, setImage] = useState(rainy1);
  const [image2, setImage2] = useState(rainy1);

  const { unit, setUnit } = useContext(CityContext);

  const { mode, setMode } = useContext(CityContext);

  const dayTime = convertUnixToDateTimeString(timestamp);

  useEffect(() => {
    const dayTime2 = convertUnixToDateTimeString(timestamp);

    // console.log(dayTime);
    const [hours, minutes] = dayTime2.split(":");
    const ampm = dayTime2.slice(-2); // Get AM/PM part
    // console.log(hours);
    const date = new Date(dayTime2);
    const hrs = date.getHours() % 12;
    // Convert hours to a number for comparison
    // const hourNum = parseInt(hours, 10);
    // console.log(hrs);
    // Determine if it is nighttime
    const isNightTime =
      (ampm === "PM" && hrs >= 6) || (ampm === "AM" && hrs < 6);
    if (condition == "Rain") {
      setImage(rainy5);
      setImage2(rainy5);
    } else if (condition == "Haze") {
      setImage(isNightTime ? night : rainy1);
      setImage2(rainy1);
    } else if (condition == "Drizzle") {
      setImage(rainy2);
      setImage2(rainy2);
    } else if (condition == "Thunderstorm") {
      setImage(thunder);
      setImage2(thunder);
    } else if (condition == "Clouds") {
      setImage(cloudy);
      setImage2(cloudy);
    } else {
      setImage(isNightTime ? nightmist : mist);
      setImage2(mist);
    }
  });

  if (mode == "Today") {
    return (
      <div className="next-5-days__row">
        <div className="next-5-days__date">
          {dayTime.slice(11, 16)}
          <div className="next-5-days__label">{dayTime.slice(-2)}</div>
        </div>

        <div className="next-5-days__low">
          {Math.round(convertTemperature(temp, unit))}
          {unit !== "K" && "°"}
          {unit == "K" && " "}
          {unit}
          <div className="next-5-days__label">Temp</div>
        </div>

        <div className="next-5-days__high">
          {Math.round(convertTemperature(feels_like, unit))}
          {unit !== "K" && "°"}
          {unit == "K" && " "}
          {unit}
          <div className="next-5-days__label">Feels Like</div>
        </div>

        <div className="next-5-days__icon">
          <img src={image} alt="Mostly sunny" />
        </div>

        <div className="next-5-days__rain">
          {humidity}%<div className="next-5-days__label">Humidity</div>
        </div>

        <div className="next-5-days__wind">
          {Math.round(wind)}mph
          <div className="next-5-days__label">Wind Speed</div>
        </div>
      </div>
    );
  }
  return (
    <div className="next-5-days__row">
      <div className="next-5-days__date">
        {date.slice(6, 10)}
        <div className="next-5-days__label">
          {date.slice(0, 2)}/{parseInt(date.slice(3, 5))+1}
        </div>
      </div>

      <div className="next-5-days__low">
        {Math.round(convertTemperature(avg_prev, unit))}
        {unit !== "K" && "°"}
        {unit == "K" && " "}
        <span>{unit}</span>
        <div className="next-5-days__label">Avg</div>
      </div>

      <div className="next-5-days__high">
        {Math.round(convertTemperature(high_prev, unit))}
        {unit !== "K" && "°"}
        {unit == "K" && " "}
        <span>{unit}</span>
        <div className="next-5-days__label">High</div>
      </div>
      <div className="next-5-days__high">
        {Math.round(convertTemperature(low_prev, unit))}
        {unit !== "K" && "°"}
        {unit == "K" && " "}
        <span>{unit}</span>
        <div className="next-5-days__label">Low</div>
      </div>

      <div className="next-5-days__icon">
        <img src={image2} alt="Mostly sunny" />
      </div>

      <div className="next-5-days__rain">
        {max_humid}%<div className="next-5-days__label">Max Humidity</div>
      </div>

      <div className="next-5-days__rain">
        {min_hum}%<div className="next-5-days__label">Min Humidity</div>
      </div>

      <div className="next-5-days__wind">
        {Math.round(avg_wind)}mph
        <div className="next-5-days__label">Avg Wind</div>
      </div>
    </div>
  );
}
