import React, {Component} from "react";
import axios from 'axios';

class Decisions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decision: ""
        }
    }

    componentDidMount() {
        /* axios
        .get("http://localhost:8000/api/assets/")
        .then(response => this.setState({decision: response.data.decision}))
        .catch(err => console.log(err)) */
        this.changeColor()
    }

    handleClick(decision) {
        // this.changeState(decision)
        this.changeColor(this.state.decision)
        // send state decision til backend
        this.sendResponse()
    }

    changeState(decision) {
        switch (decision) {
            case 1:
                this.setState({decision: "fordele"})
                break;
            case 2:
                this.setState({decision: "donere"})
                break;
            case 3:
                this.setState({decision: "kaste"})
                break;
            default:
            // code block
        }
    }

    changeColor() {
        switch (this.state.decision) {
            case "fordele":
                // bytt farge
                break;
            case "donere":
                // bytt farge
                break;
            case "kaste":
                // bytt farge
                break;
            default:
            // code block
        }
    }

    sendResponse() {

    }

    render() {
        return (
            <div className="decisions">
                <button onClick={this.handleClick(1)}>Fordele</button>
                <button onClick={this.handleClick(2)}>Donere</button>
                <button onClick={this.handleClick(3)}>Kaste</button>
            </div>
        );

    }
}

export default Decisions