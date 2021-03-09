import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Estate from "../components/Estate.js"

import { useAuth } from "../context/auth.js"

function EstatePage() {

    // Data from API
    const [data, setData] = useState([])

    // Authentication token to be used
    const { authToken } = useAuth()

    useEffect(() => {
        axios
        .get("http://localhost:8000/api/user-estates/" + authToken)
        .then(response => setData(response.data.estate_set))
        .catch(err => console.log(err))
    }, [])

    function mapResponseData() {
        return data.map(estate => <Estate key={estate.id} id={estate.id} name={estate.name} description={estate.description} />)
    }

    return (
        <div style={{
            width: 800,
            margin: "auto", 
            display: "block", 
            overflow: "auto",
        }}>
            <div style={{
                width: 600, 
                height: "100%",
                float: "right",
            }}>
                {mapResponseData()}
            </div>
        </div>

    );
  
};

export default EstatePage