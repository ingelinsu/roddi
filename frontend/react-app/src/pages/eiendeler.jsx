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
            isApproved: false,
            isComplete: true,
            maxPriority: 0,
            categories: {},
            category: ""
        }
        this.getAuthToken = this.getAuthToken.bind(this)
        this.getAssets = this.getAssets.bind(this)
        this.setMaxPriority = this.setMaxPriority.bind(this)
        this.getMaxPriority = this.getMaxPriority.bind(this)
        this.reorderAssets = this.reorderAssets.bind(this)
        this.useSortedAssets = this.useSortedAssets.bind(this)
        this.categorize = this.categorize.bind(this)
    }

    componentDidMount() {
        this.getAssets()
        axios
            .get("http://localhost:8000/api/approved/" + this.getAuthToken() + "&" + this.props.location.state.assetsKey)
            .then(response => { if (response.data.approved) { this.set_is_approved() } })
        axios
            .get("http://localhost:8000/api/estates/" + this.props.location.state.assetsKey)
            .then(response => { if (response.data.is_complete) { this.complete() } })
    }


    set_is_approved() {
        this.setState({
            isApproved: true
        });
    }

    /**
     * Set isApproved to true
     */
    approve(reload=true) {
        axios.get("http://localhost:8000/api/approve/" + this.getAuthToken() + "&" + this.props.location.state.assetsKey);
        this.set_is_approved();
        if (reload) {
            window.location.reload();
        }
    }

    /**
     * set isComplete to true
     */
    complete() {
        this.setState({
            isComplete: true
        });
    }

    /**
     * Toggles priority mode in state
     */
    togglePriorityChecked() {
        this.setState({
            isPriorityChecked: !this.state.isPriorityChecked
        }, () => this.getAssets());
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
     * Maps assets to a list of components after sending them through filter method
     * @returns A list with Asset components
     */
    assetToComponent() {
        return this.assetsFilter()
            .map(asset => <Asset
                key={asset.id}
                id={asset.id}
                name={asset.name}
                description={asset.description}
                image_url={asset.image_url}
                category={asset.category}
                onGetAssets={this.getAssets}
                onGetMaxPriority={this.getMaxPriority}
                onReorderAssets={this.reorderAssets}
                isPriorityView={this.state.isPriorityChecked}
            />)
    }

    /**
     * Filters assets after different statements
     * @returns The filtered assets
     */
    assetsFilter() {
        /* if(this.state.assetsData.length )
        console.log(this.state.assetsData[1].category) */
        if (!this.state.isPriorityChecked && this.state.category.length === 0) {
            return this.state.assetsData
        }
        if (this.state.isPriorityChecked && this.state.category.length === 0) {
            return this.state.assetsData.filter(asset => asset.distribute_votes.length > 0)
        }
        let data = []
        if (this.state.isPriorityChecked && this.state.category.length > 0) {
            return this.state.assetsData.filter(asset => asset.distribute_votes.length > 0 && asset.category === this.state.category)
        }
        if (!this.state.isPriorityChecked && this.state.category.length > 0) {
            return this.state.assetsData.filter(asset => asset.category === this.state.category)
        }
        return data

    }

    /**
     * Gets the latest asset changes from API, one for assets ordered by id and one ordered by priority
     * @returns A promise resolution or rejection
     */
    async getAssets() {
        if (!this.state.isPriorityChecked) {
            return axios
                .get("http://localhost:8000/api/estate-assets/" + this.props.location.state.assetsKey)
                .then(response => {
                    //Sets state then, calculates new highest priority possible
                    this.setState({
                        assetsData: response.data.assets
                    }, () => {
                        this.setMaxPriority()
                        this.getCategories()
                    })
                })
                .catch(err => console.log(err))
        }
        else {
            return axios
                .get("http://localhost:8000/api/sorted-assets/" + this.getAuthToken() + "&" + this.props.location.state.assetsKey)
                .then(response => {
                    this.setState({
                        assetsData: response.data.assets
                    })
                })
                .catch(err => console.log(err))
        }

    }

    /**
     * Sets the highest allowed priority in maxPriority state
     */
    setMaxPriority() {
        let max = 0
        this.state.assetsData.forEach(asset => asset.distribute_votes.includes(this.getAuthToken()) ? max++ : max += 0)
        this.setState({ maxPriority: max })
    }

    /**
     * Gets maxPriority state
     * @returns maxPriority state
     */
    getMaxPriority() {
        return this.state.maxPriority
    }

    /**
     * Reorders priority of all assets that use priority
     * @param {The priority of the removed asset} removedPriority 
     */
    reorderAssets(removedPriority) {
        axios
            .get("http://localhost:8000/api/sorted-assets/" + this.getAuthToken() + "&" + this.props.location.state.assetsKey)
            .then(response => this.useSortedAssets(response.data.assets, removedPriority))
            .then(this.getAssets())
            .catch(err => console.log(err))

    }

    /**
     * Uses the sorted assets to reprioritize the priority of all other assets that uses priority
     * @param {Assets sorted by priority} assets 
     * @param {The priority of the removed asset} removedPriority 
     */
    useSortedAssets(assets, removedPriority) {
        let newPriority = removedPriority;
        // Go through all assets and find all assets which has this users distribute votes
        // Then check if that asset has a higher priority than the removed asset
        // If it has move all higher priority assets to correct priority
        assets.forEach(asset => {
            if (asset.distribute_votes.includes(this.getAuthToken())) {
                axios
                    .get("http://localhost:8000/api/priority/" + this.getAuthToken() + "&" + asset.id)
                    .then(response => {
                        if (response.data.priority > removedPriority) {
                            axios
                                .get("http://localhost:8000/api/reprioritize/" + this.getAuthToken() + "&" + asset.id + "&" + newPriority)
                                .then(newPriority++)
                                .catch(err => console.log(err))

                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    }

    getCategories() {
        let categoryObj = {}
        let nr = 0
        this.state.assetsData.forEach(asset => {
            if (!Object.values(categoryObj).includes(asset.category)) {
                categoryObj[nr] = asset.category
                nr++
            }
        })
        this.setState({ categories: categoryObj })

    }

    categorize(value) {
        console.log("category:" + value)
        this.setState({ category: value })
    }

    render() {

        let topBarText;
        if (!this.state.isApproved) {
            topBarText = "Er du ferdig med fordeling og avstemning for dette dødsboet?";
        }
        else if (this.state.isComplete) {
            topBarText = "Dette dødsboet er ferdig oppgjort. Du har fått tildelt eiendelene merket med grønt.";
        }
        else {
            topBarText = "Du har gjort deg ferdig med dette dødsboet. Du kan fortsatt endre valgene dine til resten har blitt ferdig.";
        }

        return (
            <div className="eiendelerWrapper">
                <div className="topBar">
                    <div className="topBarText">{topBarText}</div>
                    {this.state.isApproved ? "" :
                        <div className="topBarButton finishedButton">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    defaultChecked={this.state.isApproved}
                                    onChange={(e) => this.approve()}
                                    disabled={this.state.isApproved}>
                                </input>
                                <span className="slider"></span>
                            </label>
                        </div>
                    }
                </div>
                <div className="topBar">
                    <div className="topBarButton">
                        <label className="switch">
                            <input
                                type="checkbox"
                                defaultChecked={this.state.isPriorityChecked}
                                onChange={(e) => this.togglePriorityChecked()}>
                            </input>
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="topBarText">Fordelingsprioritering</div>
                </div>
                <div className="assets">
                    {this.assetToComponent()}
                </div>
                <div className="categories">
                    <Category categories={this.state.categories} onCategorize={this.categorize} />
                </div>
            </div >
        );
    }

};

export default AssetsPage