import React, {Component} from 'react';
import axios from 'axios';

import Estate from "../components/Estate.js"
import Asset from "../components/Dødsbo/Asset"
import HouseIcon from "../components/Dødsbo/HouseIcon"


class EstatePage extends Component {

    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         data: []
    //     }
    // }

    // componentDidMount() {
    //     axios
    //     .get("http://localhost:8000/api/assets/")
    //     .then(response => this.setState({data: response.data}))
    //     .catch(err => console.log(err))
    // }

    // mapResponseData() {
    //     return this.state.data.map(asset => <Asset key={asset.key} name={asset.name} description={asset.description} />)
    // }



    render() {
        return (
            <div>
            <div>
                {/* {this.mapResponseData()} */}
               {/*   <Estate /> */}
            </div>
            <div> 
                <div><HouseIcon/></div>
            </div>
            </div>
        );
    }
  
};

export default EstatePage