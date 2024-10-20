import { dummyDayDataAll, dummyWeekDataAll } from "../constants/sampleData";
import { CityContext } from "../src/context/weatherContext";
import ButtonGroup from "./ButtonGroup";
import NextDay from "./NextDay";
import { useContext, useEffect } from "react";

function convertISOToIST(dateString) {
  // Create a Date object from the ISO date string
  const date = new Date(dateString);

  // Get UTC time in milliseconds and add the offset for IST (5 hours 30 minutes)
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
  const istDate = new Date(date.getTime() + istOffset);

  // Format the date as MM/DD/YYYY HH:MM AM/PM
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return istDate.toLocaleString("en-US", options);
}

export default function NextDays({ data }) {
  const { mode, city, weekData, todayData } = useContext(CityContext);
  const dummyDayData = todayData ? todayData[city] : [];
  const dummyWeekData = weekData ? weekData[city] : [];
  return (
    <div className="next-5-days">
      {/* <h2 className="next-5-days__heading">Last 7 days</h2> */}
      <div className="mx-auto my-2 w-1/2">
        <ButtonGroup />
      </div>
      <div className="next-5-days__container">
        {/* {data.rain_sum.map((el, i) => {
          return ( */}

        {mode === "Today"
          ? [...dummyDayData]
              .reverse()
              .filter((_, index) => index % 2 === 1)
              .map((el) => (
                <NextDay
                  key={el.id}
                  temp={el.temperature}
                  feels_like={el.feels_like}
                  humidity={el.humidity}
                  timestamp={el.timestamp}
                  condition={el.condition}
                  wind={el.wind_speed}
                />
              ))
          : dummyWeekData.map((el) => (
              <NextDay
                key={el.id}
                avg_prev={el.avg_temp}
                high_prev={el.max_temp}
                low_prev={el.min_temp}
                max_humid={el.max_humidity}
                min_hum={el.min_humidity}
                avg_wind={el.avg_wind_speed}
                date={convertISOToIST(el.date)}
                condition={el.dominant_condition}
                timestamp={el.timestamp}
              />
            ))}

        {/* );
        })} */}
      </div>
    </div>
  );
}
