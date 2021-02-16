import React, {Component} from "react";
import axios from 'axios';

import './Decisions.css'

class Decisions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decision: "",
            fordeleColor: "green",
            donereColor: "green",
            kasteColor: "green"
        }
        this.changeColor = this.changeColor.bind(this)
        this.changeState = this.changeState.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    

    componentDidMount() {
        /* axios
        .get("http://localhost:8000/api/assets/")
        .then(response => this.setState({decision: response.data.decision}))
        .catch(err => console.log(err)) */
        //this.changeColor()
    }

    handleClick(decision) {
        this.changeState(decision)
        this.changeColor(decision)
        // send state decision til backend
    }

    changeState(decision) {
        let decisionString = "";
        switch (decision) {
            case 1:
                decisionString = "fordele"
                break;
            case 2:
                decisionString = "donere"
                break;
            case 3:
                decisionString = "kaste"
                break;
            default:
                return
        }
        this.setState({decision: decisionString}, this.sendResponse)
    }

    changeColor(decision) {
        const defaultColor = "green"
        this.setState({fordeleColor: "green"})
        this.setState({donereColor: "green"})
        this.setState({kasteColor: "green"})
        switch (decision) {
            case 1:
                this.setState({fordeleColor: "orange"})
                break;
            case 2:
                this.setState({donereColor: "orange"})
                break;
            case 3:
                this.setState({kasteColor: "orange"})
                break;
            default:
        }
    }

    sendResponse() {
        console.log(this.state.decision)

    }

    render() {
        return (
            <div className="decisions">
                <button style={{backgroundColor: this.state.fordeleColor}} onClick={(e) => this.handleClick(1)}>Fordele</button>
                <button style={{backgroundColor: this.state.donereColor}} onClick={(e) => this.handleClick(2)}>Donere</button>
                <button style={{backgroundColor: this.state.kasteColor}} onClick={(e) => this.handleClick(3)}>Kaste</button>
            </div>
        );

    }
}

export default Decisions