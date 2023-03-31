import React from "react";
import EditProfil from "../components/EditProfil/EditProfil";
import Home from "../Home/Home";
import "./Profil.css";

const Profil = () => {
  return (
    <div className="profil">
      <EditProfil />
      <div className="home">
        <Home />
      </div>
    </div>
  );
};

export default Profil;