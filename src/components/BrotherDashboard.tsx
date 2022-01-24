import React from "react";
import { useSelector } from "react-redux";
import { BaseBrother } from "./Brother";

interface RootState {
    auth: boolean
}

export const BrotherDashboard = () => {
    const user = useSelector((state:RootState) => state.auth)
    console.log(user)

    const name = "Imie"
    const surname = "Nazwisko"
    return (
        <div>
            <h1>Strona po zalogowaniu. Witaj: {name} {surname}!</h1>
        </div>
    )
}