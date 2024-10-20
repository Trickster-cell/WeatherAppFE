import React, { useContext } from "react";
import { CityContext } from "../src/context/weatherContext";

const ButtonGroup = () => {
  const { mode, setMode } = useContext(CityContext);
  const handleRadioChange = (event) => {
    setMode(event.target.value); // Update the mode with the selected radio value
  };
  return (
    <>
      <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input
              id="horizontal-list-radio-license"
              type="radio"
              value="Today"
              name="list-radio"
              onChange={handleRadioChange}
              defaultChecked
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="horizontal-list-radio-license"
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Today's History{" "}
            </label>
          </div>
        </li>
        <li class="w-full dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input
              id="horizontal-list-radio-passport"
              type="radio"
              value="This Week"
              name="list-radio"
              onChange={handleRadioChange}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="horizontal-list-radio-passport"
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Last 7 days
            </label>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ButtonGroup;
