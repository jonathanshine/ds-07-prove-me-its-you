import React, { createContext, useState } from 'react'

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [login, setLogin] = useState();

    return (
        <UserContext.Provider value={{login, setLogin}}>
            {props.children}
        </UserContext.Provider>
    )
}
