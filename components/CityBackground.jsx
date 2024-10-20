import React, { useEffect, useState } from "react";
import Mumbai from "../images/Mumbai.jpg";
import Delhi from "../images/Delhi.jpg";
import Kolkata from "../images/Kolkata.jpg";
import Bangalore from "../images/Bangalore.jpg";
import Hyderabad from "../images/Hyderabad.jpg";
import Chennai from "../images/Chennai.jpg";

// Mapping of city names to images
const cityImages = {
  Mumbai,
  Delhi,
  Kolkata,
  Bangalore,
  Hyderabad,
  Chennai,
};

const CityBackground = ({ city, children }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [fade, setFade] = useState(false); // State for fading effect

  useEffect(() => {
    // Start fade out
    setFade(true);

    const timer = setTimeout(() => {
      // Load the image after fade out
      if (cityImages[city]) {
        setBackgroundImage(`url(${cityImages[city]})`);
      }
      // Start fade in
      setFade(false);
    }, 250); // Match this duration with the CSS transition duration

    return () => clearTimeout(timer);
  }, [city]);

  return (
    <div
      className={`city my-7 p-4 transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "500px",
        // filter: "brightness(0.7)", // Darken the background for better text visibility
      }}
    >
      {children} {/* Render any child components or elements here */}
    </div>
  );
};

export default CityBackground;
