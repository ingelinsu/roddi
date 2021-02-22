import React, { useState } from 'react';

import {useAuth} from '../context/auth.js'

import axios from 'axios'

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function getLogin() {
    console.log("HEI")
    axios.get("http://127.0.0.1:8000/api/login/" + email + "&" + password)
    .then(result => {
      console.log("hei")
      /* if (result.data == {"denied": "wrong credentials"}) {
        console.log("FEIL PASSORD")
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        console.log("Skriver ut id...")
        console.log(result.data.id)
        setIsError(true);
      } */

    }).catch(e => {
      console.log("ERROR")
      setIsError(true);
    });
  }

    return (
      <div className="login-wrapper">
      <h4>Logg inn:</h4>
      <form>
        <label>
          <p>Brukernavn</p>
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
    </div>
      );
  }


  export default Login