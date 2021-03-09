import React, {Component} from 'react';

import './Category.css'

function Category(){
    return(
    
        <div className="sidenav">
        <a href="#interiør">Interiør</a>
        <a href="#klær">Klær</a>
        <a href="#kjøkkenutstyr">Kjøkkenutstyr</a>
        <a href="#hageutstyr">Hageutstyr</a>
      </div>
    ); 
}

export default Category