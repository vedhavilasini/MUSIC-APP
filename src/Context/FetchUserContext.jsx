import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthUserContext } from './AuthContextApi';
import { doc, onSnapshot } from 'firebase/firestore';
import { __DB } from '../backend/firebaseconfig';

// ! step-1:create context for the backend user
export let BackendUserContext = createContext(null);
const FetchUserContext = ({ children }) => {
    let { authUser } = useContext(AuthUserContext);
    let uid = authUser?.uid;

    let [userData, setuserData] = useState(null || {})
    let[role,setRole]=useState("");
    useEffect(() => {
        if (!uid) {
            return;
        }
        // ! onSnapshot()->eventlistenser
        let user_data_reference = doc(__DB, "user_details", uid);
        onSnapshot(user_data_reference, (userInfo) => {
            console.log(userInfo)
            setuserData(userInfo?.data())
        })
    }, [uid])
    // ![uid]->dependency array-whenever uid is there
    // !its will fetch the data
    return (
        <BackendUserContext.Provider value={{ userData }}>
            {children}
        </BackendUserContext.Provider>
    )
}

export default FetchUserContext