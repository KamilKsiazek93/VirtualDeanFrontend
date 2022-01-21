import React from "react";
import { useLocation } from "react-router-dom";

export const BrotherDashboard = () => {
    const location = useLocation()
    const name = location.state.name
    const surname = location.state.surname
    return (
        <div>
            <h1>Strona po zalogowaniu. Witaj: {name} {surname}!</h1>
        </div>
    )
}