import React, {useEffect, useState, useRef} from "react";
import axios from 'axios';

import {useAuth} from '../context/auth.js'

import './Decisions.css'

function Decisions(props) {

    const [decision, setDecision] = useState("")
    const [fordeleColor, setFordeleColor] = useState("#08B5A0")
    const [donereColor, setDonereColor] = useState("#08B5A0")
    const [kasteColor, setKasteColor] = useState("#08B5A0")
    const [responseReady, setResponseReady] = useState(false)

    const { authToken } = useAuth()
    
    // Getting votes from API
    useEffect(() => {
        console.log("le votes")

        const vote;
        axios
        .get("http://localhost:8000/api/assets/" + props.assetId)
        .then(response => {
            // Goes through each entry in object and tries to find vote responding to userId of logged in user
            Object.entries(response.votes).forEach(entry => {
                const [key, value] = entry
                value.find(element => element === authToken) ? vote = key : vote = ""
            })
        })
        .catch(err => console.log(err))

        const decisionNr;
        switch(vote) {
            case "distribute" :
                decisionNr = 1
                break
            case "donate" :
                decisionNr = 2
                break
            case "throw" :
                decisionNr = 3
                break
            default:
                return
        }
        changeState(decisionNr)
        changeColor(decisionNr)
    }, [])

    // Sends response on update of decision after getting votes from API
    useEffect(() => {
        if(responseReady) {
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
        console.log("Response sent")
        console.log(decision)
        console.log(authToken)

        // PUT/POST api/assets/vote/assetid/uid/newvote
        // 1. Sett inn brukerid gjennom auth context
        // 2. sette in assetid gjennom this.props.id
        // 3. sette vote med decision

        axios
        .get("http://127.0.0.1:8000/api/vote/" + authToken + "&" + props.assetId + "&" + decision)
        .catch(err => console.log(err))
    }
    
    return (
        <div className="decisions">
            <button style={{backgroundColor: fordeleColor}} onClick={(e) => handleClick(1)}>Fordele</button>
            <button style={{backgroundColor: donereColor}} onClick={(e) => handleClick(2)}>Donere</button>
            <button style={{backgroundColor: kasteColor}} onClick={(e) => handleClick(3)}>Kaste</button>
        </div>
    );

}

export default Decisions