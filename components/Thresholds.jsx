import React, { useContext, useState } from "react";
import { CityContext } from "../src/context/weatherContext";

const Thresholds = () => {
  const { userDetails, setUserDetails } = useContext(CityContext);

  const handleIncrement = (fieldName, maxValue) => {
    setUserDetails((prevDetails) => {
      const newValue = Math.min(prevDetails[fieldName] + 1, maxValue);

      return {
        ...prevDetails,
        [fieldName]: newValue, // Increment normally
      };
    });
  };

  const handleDecrement = (fieldName, minValue) => {
    setUserDetails((prevDetails) => {
      const newValue = Math.max(prevDetails[fieldName] - 1, minValue);

      return {
        ...prevDetails,
        [fieldName]: newValue, // Increment normally
      };
    });
  };

  const MaxTempIcon = () => {
    return (
      <svg viewBox="0 0 512 512" fill="currentColor" height="2em" width="2em">
        <path d="M416 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm0 64c53 0 96-43 96-96S469 0 416 0s-96 43-96 96 43 96 96 96zM96 112c0-26.5 21.5-48 48-48s48 21.5 48 48v164.5c0 17.3 7.1 31.9 15.3 42.5 10.5 13.6 16.7 30.5 16.7 49 0 44.2-35.8 80-80 80s-80-35.8-80-80c0-18.5 6.2-35.4 16.7-48.9 8.2-10.7 15.3-25.3 15.3-42.6V112zM144 0C82.1 0 32 50.2 32 112v164.5c0 .1-.1.3-.2.6-.2.6-.8 1.6-1.7 2.8C11.2 304.2 0 334.8 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-33.2-11.3-63.8-30.1-88.1-.9-1.2-1.5-2.2-1.7-2.8-.1-.3-.2-.5-.2-.6V112C256 50.2 205.9 0 144 0zm0 416c26.5 0 48-21.5 48-48 0-20.9-13.4-38.7-32-45.3V112c0-8.8-7.2-16-16-16s-16 7.2-16 16v210.7c-18.6 6.6-32 24.4-32 45.3 0 26.5 21.5 48 48 48z" />
      </svg>
    );
  };

  const MinTempIcon = () => {
    return (
      <svg viewBox="0 0 512 512" fill="currentColor" height="2em" width="2em">
        <path d="M448 96c0-17.7-14.3-32-32-32s-32 14.3-32 32 14.3 32 32 32 32-14.3 32-32zm64 0c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM144 64c-26.5 0-48 21.5-48 48v164.5c0 17.3-7.1 31.9-15.3 42.5C70.2 332.6 64 349.5 64 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM32 112C32 50.2 82.1 0 144 0s112 50.1 112 112v164.5c0 .1.1.3.2.6.2.6.8 1.6 1.7 2.8 18.9 24.4 30.1 55 30.1 88.1 0 79.5-64.5 144-144 144S0 447.5 0 368c0-33.2 11.2-63.8 30.1-88.1.9-1.2 1.5-2.2 1.7-2.8.1-.3.2-.5.2-.6V112zm160 256c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V272c0-8.8 7.2-16 16-16s16 7.2 16 16v50.7c18.6 6.6 32 24.4 32 45.3z" />
      </svg>
    );
  };

  const MaxWindIcon = () => {
    return (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M5 8h8.5a2.5 2.5 0 10-2.34-3.24M3 12h15.5a2.5 2.5 0 11-2.34 3.24M4 16h5.5a2.5 2.5 0 11-2.34 3.24" />
      </svg>
    );
  };

  const MinWindIcon = () => {
    return (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path d="M5 8h3m4 0h1.5a2.5 2.5 0 10-2.34-3.24M3 12h9M16 12h2.5a2.5 2.5 0 011.801 4.282M4 16h5.5a2.5 2.5 0 11-2.34 3.24M3 3l18 18" />
      </svg>
    );
  };

  const HumidIcon = () => {
    return (
      <svg viewBox="0 0 30 30" fill="currentColor" height="2em" width="2em">
        <path d="M7.56 17.19c0-.88.24-1.89.72-3.03s1.1-2.25 1.86-3.31c1.56-2.06 2.92-3.62 4.06-4.67l.75-.72c.25.26.53.5.83.72.41.42 1.04 1.11 1.88 2.09s1.57 1.85 2.17 2.65c.71 1.01 1.32 2.1 1.81 3.25s.74 2.16.74 3.03c0 1-.19 1.95-.58 2.86-.39.91-.91 1.7-1.57 2.36-.66.66-1.45 1.19-2.37 1.58-.92.39-1.89.59-2.91.59-1 0-1.95-.19-2.86-.57-.91-.38-1.7-.89-2.36-1.55-.66-.65-1.19-1.44-1.58-2.35s-.59-1.89-.59-2.93zm2.26-2.93c0 .83.17 1.49.52 1.99.35.49.88.74 1.59.74.72 0 1.25-.25 1.61-.74.35-.49.53-1.15.54-1.99-.01-.84-.19-1.5-.54-2-.35-.49-.89-.74-1.61-.74-.71 0-1.24.25-1.59.74-.35.5-.52 1.16-.52 2zm1.57 0v-.35c0-.08.01-.19.02-.33s.02-.25.05-.32.05-.16.09-.24c.04-.08.09-.15.15-.18.07-.04.14-.06.23-.06.14 0 .25.04.33.12s.14.21.17.38c.03.18.05.32.06.45s.01.3.01.52c0 .23 0 .4-.01.52s-.03.27-.06.45c-.03.17-.09.3-.17.38s-.19.12-.33.12c-.09 0-.16-.02-.23-.06a.335.335 0 01-.15-.18c-.04-.08-.07-.17-.09-.24-.02-.08-.04-.19-.05-.32-.01-.14-.02-.25-.02-.32v-.34zm.59 7.75h1.32l4.99-10.74h-1.35l-4.96 10.74zm4.3-2.99c.01.84.2 1.5.55 2 .35.49.89.74 1.6.74.72 0 1.25-.25 1.6-.74.35-.49.52-1.16.53-2-.01-.84-.18-1.5-.53-1.99-.35-.49-.88-.74-1.6-.74-.71 0-1.25.25-1.6.74-.36.49-.54 1.15-.55 1.99zm1.57 0c0-.23 0-.4.01-.52s.03-.27.06-.45.09-.3.17-.38.19-.12.33-.12c.09 0 .17.02.24.06.07.04.12.1.16.19.04.09.07.17.1.24s.04.18.05.32l.01.32v.69l-.01.32-.05.32-.1.24-.16.19-.24.06c-.14 0-.25-.04-.33-.12s-.14-.21-.17-.38c-.03-.18-.05-.33-.06-.45s-.01-.3-.01-.53z" />
      </svg>
    );
  };

  const IndividualComp = ({ Icon, param, field }) => {
    return (
      <>
        {/* <label htmlFor="guests-input" className="sr-only">
          Choose number of guests:
        </label> */}
        <div className="flex flex-col justify-center items-center">
          <div className="relative flex items-center mb-2">
            <button
              type="button"
              onClick={() => handleDecrement(field, 0)}
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <div
              class="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse"
              style={{ left: "5em", bottom: "1em" }}
            >
              {Icon}
            </div>

            <input
              type="text"
              id="guests-input"
              name={field}
              value={userDetails[field]}
              readOnly
              className="py-2 bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />

            <button
              type="button"
              onClick={() => handleIncrement(field, 100)}
              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <svg
                className="w-3 h-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <div class=" relative bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-xs text-gray-400 space-x-1 rtl:space-x-reverse">
            <span>{param}</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form className="max-w-xs mx-auto">
        {/* Bedrooms Input */}
        <IndividualComp
          Icon={<MaxTempIcon />}
          param={"Max Temp (°C)"}
          field={"maxTemp"}
        />
        <IndividualComp
          Icon={<MinTempIcon />}
          param={"Min Temp (°C)"}
          field={"minTemp"}
        />
        <IndividualComp
          Icon={<MaxWindIcon />}
          param={"Max Wind (mph)"}
          field={"maxWindSpeed"}
        />
        <IndividualComp
          Icon={<MinWindIcon />}
          param={"Min Wind (mph)"}
          field={"minWindSpeed"}
        />
        <IndividualComp
          Icon={<HumidIcon />}
          param={"Max Humidity (%)"}
          field={"minHumidity"}
        />
        <IndividualComp
          Icon={<HumidIcon />}
          param={"Min Humidity (%)"}
          field={"maxHumidity"}
        />

        {/* Guests Input */}
      </form>
    </div>
  );
};

export default Thresholds;
