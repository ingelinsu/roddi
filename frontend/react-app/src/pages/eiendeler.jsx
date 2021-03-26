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
            assetsArray: [],
            isPriorityChecked: false
        }
        this.getAuthToken = this.getAuthToken.bind(this)
    }

    togglePriorityChecked() {
        this.setState({
            isPriorityChecked: !this.state.isPriorityChecked
        }, () => this.setDistributionView());

    }

    getAuthToken() {
        const { authToken } = this.context
        return authToken
    }

    setDistributionView() {
        console.log("http://localhost:8000/api/sorted-assets/" + this.getAuthToken() + "&" + this.props.location.state.assetsKey)
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
            .catch(err => console.log(err))
    }

    assetsToFilter(assets, filterBoolean) {
        if (filterBoolean) {
            return assets.filter(asset => asset.distribute_votes.length > 0)
        }
        return assets

    }

    assetToComponent(asset) {
        return (<Asset
            key={asset.id}
            id={asset.id}
            name={asset.name}
            description={asset.description}
            image_url={asset.image_url}
            category={asset.category}
            onReorder={this.reorderResponseData}
            isPriorityView={this.state.isPriorityChecked}
        />)

    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/estate-assets/" + this.props.location.state.assetsKey)
            .then(response => {
                this.setState({
                    assetsArray: response.data.assets.map(asset => this.assetToComponent(asset))//this.mapAssets(response)
                })

            })//this.setState({ data: response.data.assets }))
            .catch(err => console.log(err))
    }

    reorderResponseData(assetId, direction) {

        axios.get("http://localhost:8000/api/reprioritize/" + this.getAuthToken() + "&" + assetId + "&" + 2)

        console.log("moved asset nr.: " + assetId + "-" + direction)
    }

    render() {

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
                    {this.state.assetsArray}
                </div>
                <div className="categories">
                    <Category />
                </div>
            </div >
        );
    }

};

export default AssetsPage