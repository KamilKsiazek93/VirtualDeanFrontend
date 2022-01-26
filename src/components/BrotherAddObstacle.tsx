import React, { useEffect, useState } from "react";
import { BaseBrother, getBrotherFromLocalStorage } from "./Brother";
import { getOfficesName, OfficeName } from "./Obstacle";

export const BrotherAddObstacle = () => {

    const [officeNames, setOfficesName] = useState<Array<OfficeName> | null>(null)
    const [brother, setBrother] = useState<BaseBrother>()

    useEffect(() => {
        const getData = async() => {
            const officeNames = await getOfficesName()
            setOfficesName(officeNames)
            const brother = getBrotherFromLocalStorage();
            setBrother(brother);
        }
        getData()
    }, [])

    return (
        <div>
            <h1>Zgłoś przeszkodę</h1>
        </div>
    )
}