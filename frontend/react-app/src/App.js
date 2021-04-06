import './App.css';
import React, { useState } from 'react'
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
import Estate from "./pages/dodsbo.jsx"
import EierVindu from "./pages/eier.jsx"
import Register from "./pages/registrering.jsx"

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

import PrivateRoute from "./components/PrivateRoute.js"
import { AuthContext } from "./context/auth.js"

function App() {

  const existingToken = JSON.parse(localStorage.getItem("id"));
  const [authToken, setAuthToken] = useState(existingToken);

  const setToken = (data) => {
    if (!isNaN(data)) {
      // user login
      localStorage.setItem("id", data)
    } else {
      // user logout
      localStorage.removeItem("id")
    }
    setAuthToken(data);
  }

  return (
    <div id="app">

      <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
        <Router>
        <Navbar />
            <div id="content">
                <Route exact path="/" component={Main} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/eiendeler" component={Assets} />
                <PrivateRoute exact path="/dodsbo" component={Estate} />
                <Route exact path="/eier" component={EierVindu} />
                <Route exact path="/registrering" component={Register} />
            </div>
          <Footer />
        </Router>
      </AuthContext.Provider>

    </div>
  );
}


export default App;
