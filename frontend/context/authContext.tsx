import React, { createContext, useEffect, useState } from "react";
import { createNewUser, signInUser, returnAuth } from "../util/auth";
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext(null)

export default function AuthContext ({children}) {

    const [currentUser, setCurrentUser] = useState(null);

    const auth = returnAuth();

    

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("logged in")
                setCurrentUser(user);
            }
        })
    }, [auth])

    const login = (email, password) => {
        console.log("login"+email)
        signInUser(email, password);
    }

    const signup = (email, password) => {
        createNewUser(email, password);
    }

    const logout = () => {
        console.log("logging out")
        auth.signOut();
        setCurrentUser(null);
    }

    return (
        <UserContext.Provider value={{signup:signup, login:login, user:currentUser, logout:logout}}>{children}</UserContext.Provider>
    )
}