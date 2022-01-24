import React from "react";
import { useLocation } from "react-router-dom";

export const BrotherAddObstacle = () => {
    const location = useLocation()
    console.log(location.state)

    return (
        <div>
            <h1>Zgłoś przeszkodę</h1>
        </div>
    )
}