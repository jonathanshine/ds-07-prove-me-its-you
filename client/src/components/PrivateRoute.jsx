import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import { UserContext } from './UserContext'

const PrivateRoute = (props) => {
    const { login } = useContext( UserContext);

    console.log("State Login -->", login);

    return (
        <div>
            {login ? <Route {...props}/> : <Redirect to="/"/>}
        </div>
    )
}

export default PrivateRoute
