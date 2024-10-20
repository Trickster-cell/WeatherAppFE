import React from "react";
import { toast } from "react-toastify";

const LoginModal = (props) => {
  const { isModalOpen, toggleModal, toggleLogin, onChange, credentials } =
    props;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials);
    try {
      const response = await fetch("https://main-weather-server.onrender.com/auth/login", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({
          userEmail: credentials.email,
          userPassword: credentials.password,
        }), // Convert credentials to JSON
      });

      if (!response.ok) {
        // If the response is not okay, throw an error
        toast.error(`Error ${response.status}: Invalid Details`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Parse the response data as JSON
      //   console.log(data); // Log the response data
      if (data.token) {
        sessionStorage.setItem("token", data.token); // Store the token
        toast.success("User Logged In Successfully");
        toggleModal();
      }
    } catch (error) {
      toast.error(`Error ${response.status}: Some error occured`);
      console.error("Error during signup:", error); // Log any errors
    }
  };
  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex justify-center items-center ${
        isModalOpen ? "block" : "hidden"
      }`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Backdrop color
        pointerEvents: isModalOpen ? "all" : "none", // Ensure modal captures clicks
      }}
    >
      <div
        className={`relative p-4 w-full max-w-md transition-transform duration-300 ease-in-out transform ${
          isModalOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          // Initial styles for the modal
          transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
        }}
      >
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Sign in to Weather App
            </h3>
            <button
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal} // Hook up the function to close the modal
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
          {/* Modal Body */}
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  value={credentials.email}
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={onChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <p
                  //   href="#"
                  className="text-blue-700 hover:underline dark:text-blue-500 cursor-pointer"
                  onClick={toggleLogin}
                >
                  Create account
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
