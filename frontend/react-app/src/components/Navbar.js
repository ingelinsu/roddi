import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import './Navbar.css'



const Navbar = () => {
    return (
    <nav role="navigation">
        <div className="logo">Logo</div>
        <div className="menuToggle">
            <input type="checkbox" />
            
            <span></span>
            <span></span>
            <span></span>
            
            <ul className="menu">
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="/eiendeler">Eiendeler</Link></li>
                <li><Link to="/">Kontakt</Link></li> 
            </ul>
        </div>
    </nav>
    );
  };

export default Navbar