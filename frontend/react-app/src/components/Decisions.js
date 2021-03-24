import React, { useEffect, useState } from "react";
import axios from 'axios';

import { useAuth } from '../context/auth.js'

import './Decisions.css'

function Decisions(props) {

    const [decision, setDecision] = useState("")

    const [fordeleColor, setFordeleColor] = useState("#08B5A0")
    const [donereColor, setDonereColor] = useState("#08B5A0")
    const [kasteColor, setKasteColor] = useState("#08B5A0")

    // ready to send response to API
    const [responseReady, setResponseReady] = useState(false)

    const { authToken } = useAuth()

    // Getting votes from API
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/assets/" + props.assetId)
            .then(response => {
                let decisionNr = 0;
                if (response.data.distribute_votes.find(element => element === authToken)) {
                    decisionNr = 1
                }
                else if (response.data.throw_votes.find(element => element === authToken)) {
                    decisionNr = 3
                }
                else if (response.data.donate_votes.find(element => element === authToken)) {
                    decisionNr = 2
                }
                else {
                    return
                }
                changeState(decisionNr)
                changeColor(decisionNr)
            })
            .catch(err => console.log(err))
    }, [])

    // Sends response on update of decision after getting votes from API
    useEffect(() => {
        if (responseReady) {
            sendResponse()
        }
    }, [decision])

    /**
     * Makes changes when user clicks button
     * @param {integer 1, 2, 3} decision 
     */
    function handleClick(decision) {
        changeState(decision)
        changeColor(decision)
        setResponseReady(true)
    }

    /**
     * Changes the state of decision
     * @param {int 1, 2, 3} decision 
     * @returns nothing
     */
    function changeState(decision) {
        let decisionString = "";
        switch (decision) {
            case 1:
                decisionString = "distribute"
                break;
            case 2:
                decisionString = "donate"
                break;
            case 3:
                decisionString = "throw"
                break;
            default:
                return
        }
        setDecision(decisionString)
    }

    /**
     * Changes the color states after which button has been pressed
     * @param {int 1, 2, 3} decision 
     */
    function changeColor(decision) {

        setFordeleColor("#08B5A0")
        setDonereColor("#08B5A0")
        setKasteColor("#08B5A0")

        switch (decision) {
            case 1:
                setFordeleColor("orange")
                break;
            case 2:
                setDonereColor("orange")
                break;
            case 3:
                setKasteColor("orange")
                break;
            default:
        }
    }

    /**
     * Sends a update response to the correct asset
     */
    function sendResponse() {
        axios
            .get("http://127.0.0.1:8000/api/vote/" + authToken + "&" + props.assetId + "&" + decision)
            .catch(err => console.log(err))
    }

    return (
        <div className="decisions">
            <button style={{ backgroundColor: fordeleColor }} onClick={(e) => handleClick(1)} disabled={props.isPriorityView}>Fordele</button>
            <button style={{ backgroundColor: donereColor }} onClick={(e) => handleClick(2)} disabled={props.isPriorityView}>Donere</button>
            <button style={{ backgroundColor: kasteColor }} onClick={(e) => handleClick(3)} disabled={props.isPriorityView}>Kaste</button>
        </div>
    );

}

export default Decisions