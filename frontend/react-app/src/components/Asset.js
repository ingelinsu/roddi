import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import './Asset.css'

import Decisions from './Decisions.js'

class Asset extends Component {

    onReprioritize(movement) {
        this.props.onReorder(this.props.id, movement)
    }

    render() {
        return (
            <div className="assetWrapper">
                <div className="priorityWrapper" style={this.props.isPriorityView ? { display: "inline-block" } : { display: "none" }}>
                    <div className="priority">
                        <button type="button" onClick={(e) => this.onReprioritize("up")}><FontAwesomeIcon icon={faCaretUp} size="3x" /></button>
                        <div className="priorityNr">{this.props.id}</div>
                        <button type="button" onClick={(e) => this.onReprioritize("down")}><FontAwesomeIcon icon={faCaretDown} size="3x" /></button>
                    </div>
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
                        <Decisions assetId={this.props.id} isPriorityView={this.props.isPriorityView} />
                    </div>
                </div>
            </div>
        );

    }
}

export default Asset