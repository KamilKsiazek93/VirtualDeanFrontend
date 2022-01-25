import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Brother";

export const BrotherDashboard = () => {
    const { user } = useSelector((state:RootState) => state.auth)

    const name = user.name ?? "Imie"
    const surname = user.surname ?? "Nazwisko"
    return (
        <div>
            <h1>Strona po zalogowaniu. Witaj: {name} {surname}!</h1>
        </div>
    )
}