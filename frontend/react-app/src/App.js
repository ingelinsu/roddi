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

class App extends Component {
  render() {
    return (
      <Router>
       <Route exact path="/" component={MainPage} />
       <Route exact path="/login" component={LoginPage} />
      </Router>
    );
  }
}

export default App;
