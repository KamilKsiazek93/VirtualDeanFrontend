import React from "react";
import {  } from "react-redux";
import { getBrotherFromLocalStorage } from "./Brother";

export const BrotherDashboard = () => {
    const brotherLocalStorage = getBrotherFromLocalStorage()

    const name = brotherLocalStorage.name
    const surname = brotherLocalStorage.surname
    return (
        <div>
            <h1>Strona po zalogowaniu. Witaj: {name} {surname}!</h1>
        </div>
    )
}