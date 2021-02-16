import React, {Component} from 'react';
import axios from 'axios';

import Asset from "../components/Asset"

class AssetsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:8000/api/assets/")
        .then(response => this.setState({data: response.data}))
        .catch(err => console.log(err))
    }

    mapResponseData() {
        return this.state.data.map(asset => 
            <Asset 
            key={asset.key} 
            name={asset.name} 
            description="En veldig kul ting..." 
            imgUrl="https://royaldesign.no/alvar-aalto-vase-16-cm#/4356"
            />)
    }



    render() {
        return (
            <div>
                {this.mapResponseData()}
            </div>
        );
    }
  
};

export default AssetsPage