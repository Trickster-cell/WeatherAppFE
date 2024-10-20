import "./App.css";
import Navbar from "../components/navbar";
import MainPage from "./pages/MainPage";
import MainCard from "../components/MainCard";
import { CityProvider } from "./context/weatherContext";
import NextDays from "../components/NextDays";
import { useEffect, useState } from "react";
import AuthModal from "../components/AuthModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CityModal from "../components/CityModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const cityToggleModal = () => {
    setIsCityModalOpen(!isCityModalOpen);
  };

  useEffect(() => {
    if (isModalOpen || isCityModalOpen) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Enable scroll
      document.body.style.overflow = "";
    }

    // Cleanup when the modal is unmounted or the open state changes
    return () => {
      document.body.style.overflow = ""; // Reset scroll behavior on component unmount or state change
    };
  }, [isModalOpen, isCityModalOpen]);
  return (
    <CityProvider>
      <ToastContainer autoClose={2000} />
      <div
        style={{
          filter: isModalOpen || isCityModalOpen ? "blur(5px)" : "none",
          transition: "filter 0.3s ease",
        }}
      >
        <Navbar
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          toggleModal={toggleModal}
          cityToggleModal={cityToggleModal}
        />
        <div className="mx-auto my-auto justify-center flex main-container">
          <MainCard
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            toggleModal={toggleModal}
          />
          <NextDays />
        </div>
      </div>
      {isModalOpen && (
        <AuthModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      )}
      {isCityModalOpen && (
        <CityModal
          isCityModalOpen={isCityModalOpen}
          cityToggleModal={cityToggleModal}
        />
      )}
    </CityProvider>
  );
}

export default App;
