import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./Brother";

export const BrotherAddObstacle = () => {
    const { user } = useSelector((state:RootState) => state.auth)
    console.log(user)

    return (
        <div>
            <h1>Zgłoś przeszkodę</h1>
        </div>
    )
}