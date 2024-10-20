// src/components/Navbar.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";
import { CityContext } from "../src/context/weatherContext";
import { NameInitialsAvatar } from "react-name-initials-avatar";
import { toast } from "react-toastify";

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F0E68C",
  "#FFD700",
  "#FF69B4",
  "#4B0082",
];
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const Navbar = (props) => {
  const { toggleModal, cityToggleModal } = props;
  const { city, setCity, userDetails, setUserDetails } =
    useContext(CityContext);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setLoggedIn(false);
    toast.success("User Logged Out!");
  };

  const enableDarkMode = () => {
    document.documentElement.classList.add("dark");
  };

  const [loggedIn, setLoggedIn] = useState(false);
  const [bgColor, setBgColor] = useState(getRandomColor());

  useEffect(() => {
    enableDarkMode();
  }, []);

  const getUserDetails = async () => {
    try {
      // Retrieve the token from sessionStorage
      const token = sessionStorage.getItem("token");

      // Make the API call with the Bearer token in the Authorization header
      const api_call = await fetch("https://main-weather-server.onrender.com/auth/details", {
        method: "GET", // Use GET method or whatever is appropriate for your endpoint
        headers: {
          "Content-Type": "application/json", // Set content type if necessary
          Authorization: `Bearer ${token}`, // Include the token here
        },
      });

      // Check if the response is okay
      if (!api_call.ok) {
        console.error("HTTP error! Status:", api_call.status);
        throw new Error("Failed to fetch user details.");
      }

      // Parse the response data as JSON
      const data = await api_call.json();
      // console.log(data.user.subscribedCitys);
      return data; // Return the data
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null; // Return null or handle the error as needed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserDetails();
      setUserDetails(userData.user);
    };

    fetchData(); // Call the async function
  }, [sessionStorage.getItem("token")]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, [sessionStorage.getItem("token")]);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://www.freeiconspng.com/uploads/weather-icon-png-2.png"
            className="h-8"
            alt="Weather App Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Weather App
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <form className="max-w-sm mx-auto">
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                >
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </form>
            </li>
            <div class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span class="sr-only">Open user menu</span>
                {loggedIn ? (
                  <NameInitialsAvatar
                    name={userDetails.name}
                    bgColor={bgColor}
                  />
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
              <div
                class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                {loggedIn && (
                  <div class="px-4 py-3">
                    <span class="block text-sm text-gray-900 dark:text-white">
                      {userDetails.name}
                    </span>
                    <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">
                      {userDetails.email}
                    </span>
                  </div>
                )}
                <ul class="py-2" aria-labelledby="user-menu-button">
                  {!loggedIn && (
                    <li>
                      <p
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={toggleModal}
                      >
                        Login
                      </p>
                    </li>
                  )}
                  {loggedIn && (
                    <>
                      <li>
                        <p
                          // href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                          onClick={cityToggleModal}
                        >
                          Set Alerts
                        </p>
                      </li>
                      <li>
                        <p
                          // href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                          onClick={handleLogout}
                        >
                          Logout
                        </p>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <button
                data-collapse-toggle="navbar-user"
                type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-user"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
