import React, { useState, useEffect } from "react";
import { BaseBrother, getBrotherFromLocalStorage } from "./Brother";
import { Table, FormCheck, Button } from "react-bootstrap";
import { addKitchenOfficeToDB, isOfficeAbleToSet, KitchenOfficeResp } from "./Offices";
import { getBaseBrothersForLiturgistOffice } from "./ApiConnection";
import { MessageIfOfficeIsAlreadySet } from "./MessageIfOfficeIsAlreadySet";

export const KitchenOffice = () => {
    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>(null);
    const [message, setMessage] = useState<string>()
    const [isKitchenOfficeAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()

    const brotherLocalStorage = getBrotherFromLocalStorage()
    const jwtToken = brotherLocalStorage.jwtToken;
    let offices = Array<KitchenOfficeResp>();

    const numberOfKitchenOfficeInSungleDay = 5;

    useEffect(() => {
        const getBrothersFromDB = async() => {
            const brothers = await getBaseBrothersForLiturgistOffice()
            setBrothers(brothers)
            const isKitchenOfficeAbleToSet = await isOfficeAbleToSet('/pipeline-status/KITCHEN')
            setInfoAboutOfficeSet(isKitchenOfficeAbleToSet)
        }
        getBrothersFromDB();
    }, [])

    const handleSendOffice = async() => {
        const result = await addKitchenOfficeToDB(offices, jwtToken)
        setMessage(result?.message)
    }

    const addOfficeToArray = (brotherId:number, officeName:string, day:string) => {
        if(day === "saturday") {
            offices.push({brotherId, saturdayOffices : officeName})
        } else {
            offices.push({brotherId, sundayOffices : officeName})
        }
    }

    const findingObjectInKitchenArray = (brotherId:number, day:string, officeName:String) => {
        if(day === "saturday") {
            return offices.find(office => office.brotherId === brotherId && office.saturdayOffices === officeName)
        } else {
            return offices.find(office => office.brotherId === brotherId && office.sundayOffices === officeName)
        }
    }

    const handleSetKitchenOffice = (brotherId:number, day:string, officeName:string) => {
        const objectExist = findingObjectInKitchenArray(brotherId, day, officeName)
        if(!objectExist?.brotherId) {
            addOfficeToArray(brotherId, officeName, day)
        } else {
            offices = offices.filter(office => office !== objectExist)
        }
    }

    const KitchenPage = () => (
        <div>
            <h1>Oficja kuchenne</h1>
            <div className="message-body">{message}</div>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th colSpan={3}></th>
                        <th colSpan={numberOfKitchenOfficeInSungleDay}>Sobota</th>
                        <th colSpan={numberOfKitchenOfficeInSungleDay}>Niedziela</th>
                    </tr>
                    <tr>
                        <th>Lp</th>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Oa</th>
                        <th>Ob</th>
                        <th>W</th>
                        <th>Zm</th>
                        <th>Zw</th>
                        <th>Oa</th>
                        <th>Ob</th>
                        <th>W</th>
                        <th>Zm</th>
                        <th>Zw</th>
                    </tr>
                </thead>
                <tbody>
                    {brothers?.map((brother, index) =>
                        <tr key={index}>
                            <td>{brother.id}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "saturday", "Oa")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "saturday", "Ob")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "saturday", "W")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "saturday", "Zm")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "saturday", "Zw")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "sunday", "Oa")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "sunday", "Ob")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "sunday", "W")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "sunday", "Zm")} /></td>
                            <td><FormCheck onChange={(e) => handleSetKitchenOffice(brother.id, "sunday", "Zw")} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={handleSendOffice}>Zatwierdź</Button>
        </div>
    )

    return (
        isKitchenOfficeAbleToSet ? <KitchenPage /> : <MessageIfOfficeIsAlreadySet />
    )
}