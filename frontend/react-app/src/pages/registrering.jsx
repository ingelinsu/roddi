import React, {useState} from 'react';
import "../components/Register.css"

import axios from 'axios'
import {withRouter} from "react-router-dom"

function Register({history}){

    const [isSignedIn, setSignedIn] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function sendResponse(){
        axios.get("http://127.0.0.1:8000/api/register/" + name + "&" + password + "&" + age  + "&" + email)            
        .catch(err => console.log(err))  
        .then(result => (setSignedIn(true)));
    }
    if (isSignedIn) {
        history.push("/");
    }
          
    return (
        <div className="registerContainer">
            <form>
                <h3>Registreringsinformasjon</h3>

                <div className="form-group">
                    <label>Navn</label>
                    <input type="name" className="form-control" 
                    onChange={e => {setName(e.target.value);
                    }}
                    placeholder="Oppgi navn" />
                </div>

                <div className="form-group">
                    <label>Alder</label>
                    <input type="age" className="form-control"
                    onChange={e => {setAge(e.target.value);
                    }}
                        placeholder="Oppgi alder" />
                </div>

                <div className="form-group">
                    <label>E-post</label>
                    <input type="email" className="form-control" 
                    onChange={e => {setEmail(e.target.value);
                    }}
                    placeholder="Oppgi e-post" />
                </div>

                <div className="form-group">
                    <label>Passord</label>
                    <input type="password" className="form-control" 
                    onChange={e => {setPassword(e.target.value);
                    }}
                    placeholder="Oppgi passord" />
                </div>

                <button type="button" onClick={() => sendResponse()}
                    className="signUp">
                        Registrer deg
                </button>
                        
            </form>
    </div>
        );       
}

export default withRouter(Register)