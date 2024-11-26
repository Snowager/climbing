import React, { createContext, useEffect, useState } from "react";
import { createNewUser, signInUser, auth} from "../util/auth";
import { onAuthStateChanged } from "firebase/auth";


export const UserContext = createContext(null)
export const ErrorContext = createContext(null)

export default function AuthContext ({children}) {

    const [currentUser, setCurrentUser] = useState(null);
    const [authError, setAuthError] = useState("");

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("logged in")
                setCurrentUser(user);
                setAuthError("");
            }
        })
    }, [auth])

    const logout = () => {
        if (currentUser) {
            auth.signOut().then(() => setCurrentUser(null)).catch((error) => {
                console.log(error.message)
            });
            console.log("hit")
        }
        if (authError) setAuthError("");
    }

    return (
        <ErrorContext.Provider value={{error:authError, setError:setAuthError}}><UserContext.Provider value={{user:currentUser, logout:logout}}>{children}</UserContext.Provider></ErrorContext.Provider>
    )
}