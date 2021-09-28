import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState();
    
    axios.defaults.baseURL = "http://localhost:5000";
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
        axios.get("/users")
            .then(function (response) {
                console.log(response);
                setUsers(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetchData();
    }, []);

    console.log(users);

    return (
        <div>
            <h2>Login Area</h2>

            <h3>Users: </h3>
            <div>
               {users ? users.map((user, index) => <p>User {index + 1}: {user.username}</p>) : <p style={{color: "red", fontWeight: "bold"}}>Must be logged in to view content</p>}
            </div>
        </div>
    )
}

export default UserList
