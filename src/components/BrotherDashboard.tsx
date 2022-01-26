import React from "react";
import {  } from "react-redux";
import { BaseBrother } from "./Brother";

export const BrotherDashboard = () => {
    const storage = window.localStorage;
    const userLocalStorage:BaseBrother = JSON.parse(storage.getItem('user') || "");

    const name = userLocalStorage.name
    const surname = userLocalStorage.surname
    return (
        <div>
            <h1>Strona po zalogowaniu. Witaj: {name} {surname}!</h1>
        </div>
    )
}