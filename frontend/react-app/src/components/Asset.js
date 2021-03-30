import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios'

import './Asset.css'

import Decisions from './Decisions.js'

import { AuthContext } from "../context/auth"

class Asset extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            priority: 0
        }
        this.getAuthToken = this.getAuthToken.bind(this)
        this.onReprioritize = this.onReprioritize.bind(this)
        this.getPriority = this.getPriority.bind(this)
    }

    componentDidMount() {
        this.getPriority()
        console.log(this.props.name + " is mounted...")
    }

    /* componentDidUpdate(prevProps, prevState) {
        console.log("component did update!")

        const token = this.getAuthToken();
        axios.get("http://localhost:8000/api/priority/" + token + "&" + this.props.id)
            .then(response => {
                const pri = response.data.priority
                if (pri !== this.state.priority) {
                    this.setState({ priority: response.data.priority })
                }
            })
            .catch(err => console.log(err))

    } */

    getPriority() {
        const token = this.getAuthToken();
        console.log("getting prio")
        axios.get("http://localhost:8000/api/priority/" + token + "&" + this.props.id)
            .then(respone => this.setState({ priority: respone.data.priority }))
            .catch(err => console.log(err))
    }

    getAuthToken() {
        const { authToken } = this.context
        return authToken
    }

    onReprioritize(movement) {
        console.log("reprioritizing " + this.props.name)
        //this.props.onReorder(this.props.id, this.state.priority, movement, callback)
        console.log("done")

        let newPriority = 0;
        if (movement === "up" /* && currentPriority !== maxPriority */) {
            newPriority = this.state.priority + 1;
        }
        else if (movement === "down" /* && currentPriority !== 0 */) {
            newPriority = this.state.priority - 1;
        }

        console.log("Changing to new priority: " + newPriority)

        const token = this.getAuthToken();

        axios.get("http://localhost:8000/api/reprioritize/" + token + "&" + this.props.id + "&" + newPriority)
            .then(this.getPriority())
            .catch(err => console.log(err))
    }

    render() {


        console.log("priority for " + this.props.name + " is " + this.state.priority)

        return (
            <div className="assetWrapper">
                <div className="priorityWrapper" style={this.props.isPriorityView ? { display: "inline-block" } : { display: "none" }}>
                    <div className="priority">
                        <button type="button" onClick={(e) => this.onReprioritize("up")}><FontAwesomeIcon icon={faCaretUp} size="3x" /></button>
                        <div className="priorityNr">{this.state.priority}</div>
                        <button type="button" onClick={(e) => this.onReprioritize("down")} disabled={this.state.priority === 0}><FontAwesomeIcon icon={faCaretDown} size="3x" /></button>
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