import './App.css';
import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Main from "./pages/index.jsx";
import Login from "./pages/login.jsx";
import Assets from "./pages/eiendeler.jsx";

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

import PrivateRoute from "./components/PrivateRoute.js"
import {AuthContext} from "./context/auth.js"

function App() {

  const existingToken = JSON.parse(localStorage.getItem("tokens"));
  const [authToken, setAuthToken] = useState(existingToken);
  
  const setToken = (data) => {
    localStorage.setItem("id", data);
    setAuthToken(data);
  }

  return (
  <div>

    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <Router>
        <Navbar />
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/eiendeler" component={Assets} />
        <Footer />
      </Router>
    </AuthContext.Provider>

  </div>
  );
  }


export default App;
