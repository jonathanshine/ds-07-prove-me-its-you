import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { UserContext } from "./UserContext";


const Login = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();
    const { setLogin } = useContext( UserContext );

    axios.defaults.baseURL = "http://localhost:5000";
    axios.defaults.withCredentials = true;

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post("/login", {
            username: e.target.username.value,
            password: e.target.password.value
        })
        .then(function (response) {
            console.log(response);
            setErrorMessage(null);
            setLogin({ username: e.target.username.value, password: e.target.password.value });
            history.push("/users");
        })
        .catch(function (error) {
            console.log(error);
            setErrorMessage(error);
        });
    };


    return (
        <div>
            <h1>Authentication Station</h1>

            <form onSubmit={(e) => handleLogin(e)}>
                <p>Login here:</p>
                <div className="inputWrapper">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" id="username" />
                </div>
                <div className="inputWrapper">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" />
                </div>
                <button>Submit</button>
                {errorMessage && <p style={{color: "red", fontWeight: "bold"}}>Username or password not valid</p>}
            </form>
        </div>
    )
}

export default Login
