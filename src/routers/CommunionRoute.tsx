import React from "react";
import { Navigate } from "react-router-dom";
import { BaseBrother } from "../components/Brother";

export const CommunionRoute = ({children}:any) => {
    
    let userLocalStorage:BaseBrother = {id: 0, name: "", surname: "" , statusBrother: "", jwtToken: ""};
    const storage = window.localStorage;

    if(storage.length > 0) {
        userLocalStorage = JSON.parse(storage.getItem('user') || "");
    }

    return userLocalStorage?.statusBrother === 'KOMUNIJNY' ? children : <Navigate to="/" />
}