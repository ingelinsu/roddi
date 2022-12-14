import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../context/auth.js";

function PrivateRoute({ component: Component, ...rest }) {
    const { authToken } = useAuth()

    return (
        <Route {...rest} render={(props) =>
            !isNaN(authToken) ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        }
        />
    );
}

export default PrivateRoute;