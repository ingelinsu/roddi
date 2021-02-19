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
            imgUrl="https://royaldesign.no/images/afcf7f4e-3bde-4791-bc83-c484c078db63"
            />)
    }



    render() {
        return (
            <div style={{
            minWidth: 400,
            maxWidth: 800, 
            height: "100%", 
            backgroundColor: "#EDEDED", 
            margin: "auto", 
            display: "block", 
            overflow: "auto"}}>
                {this.mapResponseData()}
            </div>
        );
    }
  
};

export default AssetsPage