import React, {Component} from 'react';
import './Estate.css'
import home_icon from '../images/home_icon.png';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";

class Estate extends Component {
    render() {
        return (
            <Link to="/eiendeler" className="assetLink">
            <div className="estate">
                <div className="estateImage">
                    <img src= {home_icon}  /*{this.props.image_url}*/ style={{height:150, width:150}} />
                </div>
                
                <div className="estateContent">
                    <p className="estateName">{this.props.name}</p>
                    <p className = "estateDescription">{this.props.description}</p>
                </div>
            </div>
            </Link>
        );

    }
};

export default Estate