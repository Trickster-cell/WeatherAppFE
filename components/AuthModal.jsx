import React, { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const AuthModal = (props) => {
  const { isModalOpen, toggleModal } = props;

  const [login, setLogin] = useState(true);

  const [credentials, setCredentials] = useState({
    name:"",
    email: "",
    password: ""
  });

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const toggleLogin = () => {
    setLogin(!login);
  };

  return login ? (
    <LoginModal
      isModalOpen={isModalOpen}
      toggleLogin={toggleLogin}
      toggleModal={toggleModal}
      onChange={onChange}
      credentials={credentials}
    />
  ) : (
    <RegisterModal
      isModalOpen={isModalOpen}
      toggleLogin={toggleLogin}
      toggleModal={toggleModal}
      onChange={onChange}
      credentials={credentials}
    />
  );
};

export default AuthModal;
