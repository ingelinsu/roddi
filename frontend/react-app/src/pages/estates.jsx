import React, {Component} from 'react';
import axios from 'axios';

import Estate from "../components/Estate.js"
<<<<<<< HEAD
import Asset from "../components/Dødsbo/Asset"
import HouseIcon from "../components/Dødsbo/HouseIcon"

=======
>>>>>>> 68102163c86cda3008f90c53a9be5a449b0b2212

class EstatePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios
        .get("http://localhost:8000/api/estates/")
        .then(response => this.setState({data: response.data}))
        .catch(err => console.log(err))
    }

    mapResponseData() {
        return this.state.data.map(estate => <Estate key={estate.key} name={estate.name} description={estate.description} />)
    }

    render() {
        return (
            <div>
<<<<<<< HEAD
            <div>
                {/* {this.mapResponseData()} */}
               {/*   <Estate /> */}
            </div>
            <div> 
                <div><HouseIcon/></div>
            </div>
=======
                {this.mapResponseData()}
>>>>>>> 68102163c86cda3008f90c53a9be5a449b0b2212
            </div>
        );
    }
  
};

export default EstatePage