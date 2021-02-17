import React from 'react';


function Login() {
    return (
      <div className="login-wrapper">
      <h4>Logg inn:</h4>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button id="knapp" type="submit">Submit</button>
        </div>
      </form>
    </div>
      );
  }


  export default Login