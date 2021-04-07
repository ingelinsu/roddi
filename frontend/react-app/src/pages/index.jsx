import React from "react";
import "./main.css"
import hus from '../images/hus.png';
import Login from "../components/Login"


//Functional Component 
const MainPage = () => {
  return (
    <div className="mainPageContainer">
      <h3 className="tittel">Velkommen til Røddi</h3>
      <p className="description"> 
        Røddi hjelper deg med oppgjøret etter at du har mistet et familiemedlem. Alt du trenger å gjøre er å registrere ønskelisten din, så fikser Røddi resten!
      </p>
      <div className="mainContent">
        <div className="mainImage"></div>
        <Login />
      </div>
      
    </div>
  );


     


};

export default MainPage