import React, { useContext, useEffect, useState } from "react";
import { CityContext } from "../src/context/weatherContext";
import { toast } from "react-toastify";
import Thresholds from "./Thresholds";

const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

const CityModal = (props) => {
  const { isCityModalOpen, cityToggleModal } = props;
  //   const isCityModalOpen = true;
  const { userDetails, setUserDetails } = useContext(CityContext);

  const [subscribedCitiesTemp, setSubscribedCitiesTemp] = useState([]);

  useEffect(() => {
    if (userDetails && userDetails.subscribedCitys) {
      setSubscribedCitiesTemp([...userDetails.subscribedCitys]); // Initialize with user's subscribed cities
    }
  }, [userDetails]);

  const handleCityToggle = (city) => {
    // Check if the city is already in the temporary subscribed list
    if (subscribedCitiesTemp.includes(city)) {
      // Remove city if it exists
      setSubscribedCitiesTemp((prev) =>
        prev.filter((subscribedCity) => subscribedCity !== city)
      );
    } else {
      // Add city if it does not exist
      setSubscribedCitiesTemp((prev) => [...prev, city]);
    }
    console.log(subscribedCitiesTemp);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // When saving, you can use `subscribedCitiesTemp` to update userDetails or make an API call
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        "https://main-weather-server.onrender.com/auth/subscribeCities",
        {
          method: "POST", // Specify the HTTP method
          headers: {
            "Content-Type": "application/json", // Set content type if necessary
            Authorization: `Bearer ${token}`, // Include the token here
          },
          body: JSON.stringify({
            arrayOfCities: subscribedCitiesTemp,
            minTemp: userDetails.minTemp,
            maxTemp: userDetails.maxTemp,
            minHumidity: userDetails.minHumidity,
            maxHumidity: userDetails.maxHumidity,
            minWindSpeed: userDetails.minWindSpeed,
            maxWindSpeed: userDetails.maxWindSpeed,
          }), // Convert credentials to JSON
        }
      );

      if (!response.ok) {
        // If the response is not okay, throw an error
        toast.error(`Error ${response.status}: Connection Error`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response data as JSON
      console.log("Updated subscribed cities:", subscribedCitiesTemp);
      console.log(data.success); // Log the response data
      if (data.success === true) {
        // Store the token
        toast.success("Subscriptions Updated");
        cityToggleModal();
        setUserDetails((prevDetails) => ({
          ...prevDetails, // Spread the previous state to preserve other fields
          subscribedCitys: subscribedCitiesTemp,
        }));
      }
    } catch (error) {
      toast.error(`Error ${response.status}: Some Error Occured`);
      console.error("Error during signup:", error); // Log any errors
    }

    // For example: make API call here to save the changes or pass it to parent component
  };
  //   const cityToggleModal = false;
  const handleSubmit = false;
  const credentials = false;
  const onChange = false;
  const TempComp = () => {
    return (
      <div
        id="city-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed inset-0 z-50 flex justify-center items-center ${
          isCityModalOpen ? "block" : "hidden"
        }`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Backdrop color
          pointerEvents: isCityModalOpen ? "all" : "none", // Ensure modal captures clicks
        }}
      >
        <div
          className={`flex flex-row relative p-4 w-full max-w-md transition-transform duration-300 ease-in-out transform ${
            isCityModalOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          style={{
            maxHeight: "90vh", // Limit modal height to 90% of viewport height
            overflowY: "auto", // Enable vertical scrolling if content exceeds the height
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
          }}
        >
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex flex-col">
              <div
                className="flex items-center justify-between p-2 border-b rounded-t dark:border-gray-600"
                style={{ marginLeft: "15%" }}
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Subscribe to Alert System
                </h3>

                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={cityToggleModal} // Hook up the function to close the modal
                  aria-label="Close modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 px-2">
                Subscribe to our weather alert system to get real-time updates
                for your chosen cities when your specified weather conditions
                are met. Stay prepared with timely alerts tailored to your
                needs.
              </p>
            </div>
            {/* Modal Body */}
            <div className="flex flex-col mx-auto">
              <div className="flex flex-row p-2 m-2">
                <div className="p-4 md:p-5 flex flex-col justify-center items-center w-full">
                  <h4 className="py-2 text-xs font-semibold text-gray-900 dark:text-white">
                    Select Cities
                  </h4>

                  <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-3">
                    {cities.map((city) => (
                      <li
                        key={city}
                        className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                      >
                        <div className="flex items-center ps-3">
                          <input
                            id={`checkbox-${city}`} // Make the id unique for each checkbox
                            type="checkbox"
                            value=""
                            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                            checked={subscribedCitiesTemp.includes(city)} // Checked if the city is in the temporary state
                            onChange={() => handleCityToggle(city)} // Toggle the city selection
                          />
                          <label
                            htmlFor={`checkbox-${city}`} // Reference the unique id in the label
                            className="w-full py-3 ms-5 text-sm font-medium text-gray-900 dark:text-gray-300 text-left"
                          >
                            {city}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <Thresholds />
              </div>
              <button
                type="button"
                className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                onClick={handleSaveChanges}
              >
                Update Subscriptions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex-1 mx-2">
        <TempComp />
      </div>
      <div className="flex-1 mx-2"></div>
    </div>
  );
};

export default CityModal;
