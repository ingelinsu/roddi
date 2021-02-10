import React from 'react'

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
                <a href="#"><li>Hjem</li></a>
                <a href="#"><li>Profil</li></a>
                <a href="#"><li>Kontakt</li></a>
            </ul>
        </div>
    </nav>
    );
  };

export default Navbar