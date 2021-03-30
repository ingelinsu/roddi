import React, { Component } from 'react';
import axios from 'axios';

import Asset from "../components/Asset"
import Category from "../components/Category"

import { AuthContext } from "../context/auth"

import "./eiendeler.css"

class AssetsPage extends Component {

    static contextType = AuthContext

    constructor(props) {
        super(props)
        this.state = {
            assetsData: [],
            isPriorityChecked: false,
        }
        this.getAuthToken = this.getAuthToken.bind(this)
        this.reorderResponseData = this.reorderResponseData.bind(this)
        this.updatePriority = React.createRef()
    }

    componentDidMount() {
        this.getAssets()
        console.log("Component mounted...")
    }

    togglePriorityChecked() {
        this.setState({
            isPriorityChecked: !this.state.isPriorityChecked
        }, () => this.getAssets());

    }

    getAuthToken() {
        const { authToken } = this.context
        return authToken
    }

    setDistributionView() {
        /* console.log("http://localhost:8000/api/sorted-assets/" + this.getAuthToken() + "&" + this.props.location.state.assetsKey)
        axios
            .get("http://localhost:8000/api/sorted-assets/" + this.getAuthToken() + "&" + this.props.location.state.assetsKey)
            .then(response => {
                console.log(response)
                this.setState({
                    assetsArray:
                        this.assetsToFilter(response.data.assets, this.state.isPriorityChecked)
                            .map(asset => this.assetToComponent(asset))

                })
            })
            .catch(err => console.log(err)) */
        //this.assetsToFilter()


    }

    assetsToFilter(assets, filterBoolean) {
        if (filterBoolean) {
            return assets.filter(asset => asset.distribute_votes.length > 0)
        }
        return assets

    }

    assetToComponent(useFilter) {
        return this.assetsToFilter(this.state.assetsData, useFilter)
            .map(asset => <Asset
                key={asset.id}
                id={asset.id}
                name={asset.name}
                description={asset.description}
                image_url={asset.image_url}
                category={asset.category}
                onReorder={this.reorderResponseData}
                isPriorityView={this.state.isPriorityChecked}
                ref={this.updatePriority}
            />)

        //this.setState({ componentsMounted: assets.length })
    }

    getAssets() {
        axios
            .get("http://localhost:8000/api/estate-assets/" + this.props.location.state.assetsKey)
            .then(response => {
                this.setState({
                    assetsData: response.data.assets//this.mapAssets(response)
                }, () => console.log(this.state.assetsData))

            })//this.setState({ data: response.data.assets }))
            .catch(err => console.log(err))

        /* else {
            axios
                .get("http://localhost:8000/api/sorted-assets/" + this.getAuthToken() + "&" + this.props.location.state.assetsKey)
                .then(response => {
                    this.setState({
                        assetsData: response.data.assets//this.mapAssets(response)
                    }, () => console.log(this.state.assetsData))

                })//this.setState({ data: response.data.assets }))
                .catch(err => console.log(err))
        } */

    }

    reorderResponseData(assetId, currentPriority, direction, callback) {

        let maxPriority = 0

        this.state.assetsData.forEach(asset => asset.distribute_votes.includes(this.getAuthToken()) ? maxPriority++ : maxPriority += 0)

        const token = this.getAuthToken();

        console.log("asset nr. " + assetId + ": " + currentPriority)

        let newPriority = 0;
        if (direction === "up" /* && currentPriority !== maxPriority */) {
            newPriority = currentPriority + 1;
        }
        else if (direction === "down" /* && currentPriority !== 0 */) {
            newPriority = currentPriority - 1;
        }

        console.log("Changing to new priority: " + newPriority)
        axios.get("http://localhost:8000/api/reprioritize/" + token + "&" + assetId + "&" + newPriority)
            .then(response => console.log(response.data.reprioritized))
            .catch(err => console.log(err))

        //console.log("assset array length: " + this.state.assetsData.length)

        this.getAssets()

        callback()
        //console.log("moved asset nr.: " + assetId + "-" + direction)
    }

    render() {
        let maxPriority = 0

        this.state.assetsData.forEach(asset => asset.distribute_votes.includes(this.getAuthToken()) ? maxPriority += 1 : maxPriority += 0)

        console.log("rendering...")

        console.log(maxPriority)

        return (
            <div className="eiendelerWrapper">
                <div className="topBar">
                    <div className="priorityButton">
                        <label className="switch">
                            <input
                                type="checkbox"
                                defaultChecked={this.state.isChecked}
                                onChange={(e) => this.togglePriorityChecked()}>
                            </input>
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="switchText">Fordelingsprioritering</div>
                </div>
                <div className="assets">
                    {this.assetToComponent(this.state.isPriorityChecked)}
                </div>
                <div className="categories">
                    <Category />
                </div>
            </div >
        );
    }

};

export default AssetsPage