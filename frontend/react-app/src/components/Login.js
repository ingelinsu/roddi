import React, { useState } from 'react';

import {useAuth} from '../context/auth.js'

import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken } = useAuth();

  function getLogin() {
    axios.get("http://127.0.0.1:8000/api/login/" + email + "&" + password)
    .then(result => {
      if (Object.keys(result.data)[0] == "id") {
        // ved innlogging
        setAuthToken(result.data.id);
        setLoggedIn(true);
      } else {
        // ved feil passord
        setIsError(true);
      }

    }).catch(e => {
      // feil ved henting av data
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/dodsbo" />;
  }

    return (
      <div className="login-wrapper">
      <h4>Logg inn:</h4>
      <form>
        <label>
          <p>E-mail</p>
          <input 
          type="email" 
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="e-post"
          />
        </label>
      
        <label>
          <p>Passord</p>
          <input 
          type="password" 
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="passord"
          />
        </label>
        <div>
          <button id="knapp" type="button" onClick={() => getLogin()}>Logg inn</button>
        </div>
      </form>
      { isError ? <h4>Feil brukernavn eller passord!</h4> : <span></span> }
    </div>
      );
  }


  export default Login