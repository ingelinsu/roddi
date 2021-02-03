import React from "react";
import { Link } from "react-router-dom";
//Functional Component 
const MainPage = () => {
  return (
    <div>
      <h3>Velkommen til nettsiden</h3>
      <small>Main Page</small>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default MainPage