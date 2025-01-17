import React from "react";
import Logo from "../images/accueil.png";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto mt-4">
      <img src={Logo} alt="Logo accueil" width="50" height="200"></img>
      <h1 className="text-3xl font-bold">Accueil</h1>
      <br />
      <p className="mt-2">Bienvenue sur la page d'accueil !</p>
    </div>
  );
};

export default Home;
