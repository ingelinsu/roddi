import './App.css';
import React, {Component} from 'react'
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
import Estate from "./pages/estates.jsx"

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/eiendeler" component={Assets} />
          <Route exact path="/estates" component={Estate} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
