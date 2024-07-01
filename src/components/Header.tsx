import React from "react";
import { useLocation } from "react-router-dom";

const Header: React.FC<any> = (props) => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Accueil avec useLocation";
      case "/tasks":
        return "Tâches avec useLocation";
      case "/about":
        return "About avec useLocation";
      default:
        return "Page le nom par defaut";
    }
  };
  return (
    <header className="bg-gray-800">
      <div className="container mx-auto text-white">{props.title}</div>
      <h1>{getTitle()}</h1>
      <p>{props.title}</p>
    </header>
  );
};

export default Header;
