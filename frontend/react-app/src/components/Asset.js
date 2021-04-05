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
            assetOwner: false,
            priority: 0
        }
        this.getAuthToken = this.getAuthToken.bind(this)
        this.getPriority = this.getPriority.bind(this)
        this.handleDecision = this.handleDecision.bind(this)
        this.getAssetOwner = this.getAssetOwner.bind(this)
    }

    componentDidMount() {
        this.getAssetOwner()
        this.getPriority()
    }

    componentDidUpdate() {
        this.getPriority()
    }

    getAssetOwner() {
        axios
            .get("http://localhost:8000/api/asset-owner" + this.props.assetId)
            .then(response => {
                // if the user has been assigned the asset, it will get the colour green, otherwise it will stay white
                if (response.data.id.include(element => element === this.getAuthToken())) {
                    this.setState({ assetOwner: true })
                }
            })
            .catch(err => console.log(err))
        }


    /**
     * Gets the latest priority of this asset from API
     */
    getPriority() {
        axios.get("http://localhost:8000/api/priority/" + this.getAuthToken() + "&" + this.props.id)
            .then(response => {
                const pri = response.data.priority
                if (pri !== this.state.priority) {
                    // if incoming priority is different from current, set new priority state
                    this.setState({ priority: response.data.priority })
                }
            })
            .catch(err => console.log(err))
    }

    /**
     * Gets auth token of logged in user
     * @returns auth token of user logged in
     */
    getAuthToken() {
        const { authToken } = this.context
        return authToken
    }

    /**
     * Updates the priority of this asset by -1 or +1
     * @param {"up" or "down", decides new priority} direction 
     */
    addPriority(direction) {
        let newPriority = 0;
        if (direction === "up" && this.state.priority !== 0) {
            newPriority = this.state.priority - 1;
        }
        else if (direction === "down" && this.state.priority !== this.props.onGetMaxPriority() - 1) {
            newPriority = this.state.priority + 1;
        }

        if (this.state.priority !== newPriority) {
            this.reprioritize(newPriority)
        }
    }

    /**
     * Delegates changes to priority when decision has been changed for this asset
     * @param {"distribute", "donate" or "throw", decides what to do with priority} decision 
     */
    async handleDecision(decision) {
        await this.props.onGetAssets()

        if (decision === "distribute") {
            this.giveMaxPriority()
        }
        else {
            this.reorderAllPriorities()
        }
    }

    /**
     * Gives this asset the highest priority of all assets
     */
    giveMaxPriority() {
        if (this.props.onGetMaxPriority() === 1 && this.state.priority !== 0) {
            this.reprioritize(0)
        }
        else {
            this.reprioritize(this.props.onGetMaxPriority() - 1)
        }
    }

    /**
     * Gives this asset a new priority
     * @param {The new priority to use} newPriority 
     */
    reprioritize(newPriority) {
        axios
            .get("http://localhost:8000/api/reprioritize/" + this.getAuthToken() + "&" + this.props.id + "&" + newPriority)
            .then(() => this.props.onGetAssets())
            .catch(err => console.log(err))
    }

    /**
     * Will make changes to priorities of other assets in eiendeler.jsx
     */
    reorderAllPriorities() {
        if (this.props.onGetMaxPriority() !== this.state.priority) {
            this.props.onReorderAssets(this.state.priority)
        }
    }

    render() {
        return (
            <div className="assetWrapper">
                <div className={this.state.assetOwner ? "assetColour" : null}> 
                    <div className="priorityWrapper" style={this.props.isPriorityView ? { display: "inline-block" } : { display: "none" }}>
                        <div className="priority">
                            <button type="button" onClick={(e) => this.addPriority("up")} disabled={this.state.priority === 0}><FontAwesomeIcon icon={faCaretUp} size="3x" /></button>
                            <div className="priorityNr">{this.state.priority}</div>
                            <button type="button" onClick={(e) => this.addPriority("down")} disabled={this.state.priority === this.props.onGetMaxPriority() - 1}><FontAwesomeIcon icon={faCaretDown} size="3x" /></button>
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
                            <Decisions assetId={this.props.id} isPriorityView={this.props.isPriorityView} onDecision={this.handleDecision} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Asset