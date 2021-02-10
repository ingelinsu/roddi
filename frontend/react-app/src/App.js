import './App.css';
import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import MainPage from "./pages/index.jsx";
import LoginPage from "./pages/login.jsx";

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
