import React, { useEffect, useState } from "react";
import { getBrotherFromLocalStorage, SingingBrothers } from "./Brother";
import { addScholaToDb, CantorOfficeResponse, isOfficeAbleToSet } from "./Offices";
import { FormCheck, Table, Button } from 'react-bootstrap';
import { getBaseBrothersForSchola } from "./ApiConnection";
import { MessageIfOfficeIsAlreadySet } from "./MessageIfOfficeIsAlreadySet";
import { getObstacleFromBrothers, IObstacleFromBrothers } from "./Obstacle";

export const Schola = () => {

    const [brothers, setBrothers] = useState<Array<SingingBrothers> | null>(null);
    const [obstaclesFromBrothers, setObstaclesFromBrothers] = useState<Array<IObstacleFromBrothers> | null>()
    const [message, setMessage] = useState<string>()
    const [isScholaAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()

    const brotherLocalStorage = getBrotherFromLocalStorage()
    const jwtToken = brotherLocalStorage.jwtToken;
    let offices = Array<CantorOfficeResponse>();

    useEffect(() => {
        const getSingingBrothersFromDb = async() => {
            const brothers = await getBaseBrothersForSchola()
            setBrothers(brothers);
            const obstaclesFromBrothers = await getObstacleFromBrothers()
            setObstaclesFromBrothers(obstaclesFromBrothers)
            const isScholaAbleToSet = await isOfficeAbleToSet('/pipeline-status/CANTOR')
            setInfoAboutOfficeSet(isScholaAbleToSet)
        }
        getSingingBrothersFromDb();
    }, []);

    const setCheckboxValue = (id:string, value:boolean):void => {
        let checkedBox = document.getElementById(id) as HTMLInputElement
        checkedBox.checked = value
    }
    const isAvailableCheck = (brotherId:number, officeName:string):Boolean => {
        const isInBrotherObstacleList = obstaclesFromBrothers?.find(item => item.brotherId === brotherId && 
            item.obstacles.find(o => o.includes(officeName)))
        if(isInBrotherObstacleList) {
            setMessage("Brat zgłosił przeszkodę na to oficjum")
            return false
        }
        return true
    }

    const pushObjectToArrayTray = (brotherId:number, cantorOffice:string):Boolean => {
        const objectExist = offices.find(office => office.brotherId === brotherId && office.cantorOffice === cantorOffice);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, weekOfOffices: 0, cantorOffice})
            return true
        } else {
            offices = offices.filter(office => office !== objectExist)
            return false
        }
    }

    const handleOffice = (brotherId:number, cantorOffice:string, index:number) => {
        const id = index.toString() + cantorOffice;
        if(isAvailableCheck(brotherId, cantorOffice) && pushObjectToArrayTray(brotherId, cantorOffice)) {
            setCheckboxValue(id, true)
        } else {
            setCheckboxValue(id, false)
        }
    }


    const handleSendCantorOffice = async() => {
        const result = await addScholaToDb(offices, jwtToken);
        setMessage(result?.message)
    }

    const ScholaPage = () => {
        return (
            <div>
            <h2 className="header-frame">Wyznacz scholę</h2>
            <div className="message-body">{message}</div>
            <div className="table-center">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>Schola</th>
                            <th>Psalm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brothers?.map((brother:SingingBrothers, index:any) => 
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{brother.name}</td>
                                <td>{brother.surname}</td>
                                <td><FormCheck id={index.toString() + "S"} onChange={() => handleOffice(brother.id, "S", index)} /></td>
                                <td><FormCheck id={index.toString() + "PS"} onChange={() => handleOffice(brother.id, "PS", index)} /></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Button className="button-center" variant="success" onClick={handleSendCantorOffice}>Zatwierdź</Button>
            </div>
        </div>
        )
    }

    return (
        isScholaAbleToSet ? <ScholaPage /> : <MessageIfOfficeIsAlreadySet /> 
    )
}