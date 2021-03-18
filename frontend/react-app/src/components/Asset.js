import React, { Component } from 'react';

import './Asset.css'

import Decisions from './Decisions.js'

class Asset extends Component {

    onReprioritize(movement) {
        this.props.onReorder(this.props.id, movement)
    }

    render() {
        return (
            <div className="assetWrapper">
                <div className="priority">
                    <button type="button" onClick={(e) => this.onReprioritize("up")}>Up</button>
                    <button type="button" onClick={(e) => this.onReprioritize("down")}>Down</button>
                </div>
                <div className="asset">
                    <div className="assetImage">
                        <img src={this.props.image_url} style={{ height: 150, width: 150 }} />
                    </div>

                    <div className="assetContent">
                        <p className="assetName">{this.props.name}</p>
                        <p className="assetCategory">{this.props.category}</p>
                        <p className="assetDescription">{this.props.description}</p>
                    </div>

                    <div className="buttons">
                        <Decisions assetId={this.props.id} />
                    </div>
                </div>
            </div>
        );

    }
}

export default Asset