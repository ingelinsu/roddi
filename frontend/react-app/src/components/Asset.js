import React, {Component} from 'react';

import Decisions from './Decisions.js'

class Asset extends Component {
    render() {
        return (
            <div>
                <h1 className="asset">{this.props.name}</h1>
                <p>{this.props.description}</p>
                <div className="buttons">
                    <Decisions />
                </div>
            </div>
        );

    }
}

export default Asset