import React, {Component} from 'react';

import './Asset.css'

import Decisions from './Decisions.js'

class Asset extends Component {
    render() {
        return (
            <div className="asset">
                <div className="assetImage">
                    <img src={this.props.imgUrl} style={{height:150, width:150}} />
                </div>
                
                <div className="assetContent">
                    <p className="assetName">{this.props.name}</p>
                    <p className="assetCategory">Møbler</p>
                    <p className="assetDescription">{this.props.description}</p>
                </div>

                <div className="buttons">
                    <Decisions />
                </div>
            </div>
        );

    }
}

export default Asset