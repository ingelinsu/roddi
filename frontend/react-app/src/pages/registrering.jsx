import React, {useState} from 'react';
import "../components/Register_form.css"

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
            <form>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>Name</label>
                <input type="name" className="form-control" 
                onChange={e => {setName(e.target.value);
                }}
                placeholder="Enter name" />
            </div>

            <div className="form-group">
                <label>Age</label>
                <input type="age" className="form-control"
                onChange={e => {setAge(e.target.value);
                }}
                    placeholder="Enter age" />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" 
                onChange={e => {setEmail(e.target.value);
                }}
                placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" 
                onChange={e => {setPassword(e.target.value);
                }}
                placeholder="Enter password" />
            </div>

            <button type="button" onClick={() => sendResponse()}
                className="btn btn-primary btn-block">
                    Sign Up</button>
                        
        </form>
        );       
}

export default withRouter(Register)