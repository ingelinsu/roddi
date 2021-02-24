import React, { useEffect } from 'react'

import {useAuth} from "../context/auth.js";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './Navbar.css'



function Navbar() {

    const { authToken, setAuthToken } = useAuth()

    const logoutStyle = {
        display: "none"
    }

    if(authToken) {
      logoutStyle.display = "block"
    }

    const logout = () => {
      setAuthToken();
    }

    return (
    <nav role="navigation">
        <div className="logo">-R- RØDDI</div>
        <div className="menuToggle">
            <input type="checkbox" />
            
            <span></span>
            <span></span>
            <span></span>
            
            <ul className="menu">
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="/eiendeler">Eiendeler</Link></li>
                <li><Link to="/dodsbo">Dødsbo</Link></li>
                <li><Link to="/">Kontakt</Link></li>
                <li style={logoutStyle}><a onClick={logout}>Logg ut</a></li>
            </ul>
        </div>
    </nav>
    );
  };

export default Navbar