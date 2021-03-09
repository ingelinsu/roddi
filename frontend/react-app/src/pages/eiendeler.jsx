import React, {Component} from 'react';
import axios from 'axios';

import Asset from "../components/Asset"
import Category from "../components/Category"

class AssetsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:8000/api/estate-assets/" + this.props.location.state.assetsKey)
        .then(response => this.setState({data: response.data.assets}))
        .catch(err => console.log(err))
    }

    mapResponseData() {
        return this.state.data.map(asset => 
            <Asset 
            key={asset.id} 
            name={asset.name} 
            description={asset.description}
            image_url={asset.image_url}
            category={asset.category}
            />)
    }



    render() {
        return (
            <div style={{
                width: 1000,
                backgroundColor: "#EDEDED",
                margin: "auto", 
                display: "block", 
                overflow: "auto",
            }}>
                <div style={{
                    width: 800, 
                    height: "100%",
                    float: "right"
                }}>
                    {this.mapResponseData()}
                </div>
                <div style={{
                    width: 200,
                    height: "100%"
                }}>
                    <Category/>
                </div>
            </div>
        );
    }
  
};

export default AssetsPage