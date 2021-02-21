import React, {Component} from 'react';
import axios from 'axios';

import Estate from "../components/Estate.js"

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
                {this.mapResponseData()}
            </div>
        );
    }
  
};

export default EstatePage