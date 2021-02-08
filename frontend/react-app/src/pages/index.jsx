import React from "react";
import { Link } from "react-router-dom";
import "../index.css"
import MainContent from "../components/MainContent"
import Login from "../components/Login"


//Functional Component 
const MainPage = () => {
  return (
    <div>
      <h3 id="tittel">Velkommen til nettsiden</h3>
      <small>Main Page</small>
      <MainContent />
      {/*<Login />*/}
    </div>
  );


     


};

export default MainPage