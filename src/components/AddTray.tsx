import React, { useEffect, useState } from "react";
import { Table, Button, FormCheck } from "react-bootstrap";
import { getBaseBrotherForTray } from "./ApiConnection";
import { BaseBrother } from "./Brother";
import { MessageIfOfficeIsAlreadySet } from "./MessageIfOfficeIsAlreadySet";
import { getObstacleBetweenOffices, getObstacleFromBrothers, IObstacleFromBrothers, ObstacleBetweenOffice } from "./Obstacle";
import { addTrayToDB, BrotherDashboardOffice, getLastOffice, isOfficeAbleToSet, ITrayHourResponse } from "./Offices";

export const AddTray = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>();
    const [obstacles, setObstacles] = useState<Array<IObstacleFromBrothers> | null>();
    const [lastOffice, setLastOffice] = useState<Array<BrotherDashboardOffice> | null>()
    const [isTrayAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()
    const [message, setMessage] = useState<string>()

    let offices = Array<ITrayHourResponse>()

    useEffect(() => {
        async function getData() {
            const brothers = await getBaseBrotherForTray()
            setBrothers(brothers)
            const obstacles = await getObstacleFromBrothers();
            setObstacles(obstacles)
            const lastOffice = await getLastOffice();
            setLastOffice(lastOffice)
            const isTrayAvailableToSet = await isOfficeAbleToSet('/pipeline-tray')
            setInfoAboutOfficeSet(isTrayAvailableToSet)
        }
        getData()
    }, [])


    const handleSendLiturgistTray = async() => {
        const result = await addTrayToDB(offices)
        setMessage(result?.message)
    }

    const pushObjectToArrayTray = (brotherId:number, trayHour:string) => {
        const objectExist = offices.find(office => office.brotherId === brotherId && office.trayHour === trayHour);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, trayHour})
        } else {
            offices = offices.filter(office => office !== objectExist)
        }
    }

    const handleSetTray = (brotherId:number, trayHour:string, index:number) => {
        const id = index.toString() + trayHour
        if(isAvailableCheck(id, brotherId, trayHour)) {
            pushObjectToArrayTray(brotherId, trayHour)
        }
    }

    const isAvailableCheck = (id:string, brotherId:number, trayHour:string):Boolean => {
        let checkedBox = document.getElementById(id) as HTMLInputElement
        
        const isObstacled = obstacles?.filter(item => item.brotherId === brotherId && item.obstacles.find(obstacle => obstacle === trayHour)).length ?? 0
        if(isObstacled > 0) {
            console.log('Nie może wziąć tego oficjum')
            checkedBox.checked = false
            return false
        }
        const obstacleOfficeConnected = lastOffice?.find(item => item.brotherId === brotherId && item.cantorOffice !== null)
        if(obstacleOfficeConnected && trayHour === "T10") {
            console.log('Nie może wziąć tego oficjum')
            checkedBox.checked = false
            return false
        }
        return true;
    }

    const TrayPage = () => (
        <div>
            <h2 className="header-frame">Wyznaczanie tacy</h2>
            <div className="message-body">{message}</div>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Lp</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>8.00</th>
                        <th>9.00</th>
                        <th>10.30</th>
                        <th>12.00</th>
                        <th>13.30</th>
                        <th>15.30</th>
                        <th>17.00</th>
                        <th>19.00</th>
                        <th>20.20</th>
                        <th>21.30</th>
                    </tr>
                </thead>
                <tbody>
                    {brothers?.map((brother:BaseBrother, index:any) => 
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck id={index.toString() + "T8"} onChange={(e) => handleSetTray(brother.id, "T8", index)} /></td>
                            <td><FormCheck id={index.toString() + "T9"} onChange={(e) => handleSetTray(brother.id, "T9", index)} /></td>
                            <td><FormCheck id={index.toString() + "T10"} onChange={(e) => handleSetTray(brother.id, "T10", index)} /></td>
                            <td><FormCheck id={index.toString() + "T12"} onChange={(e) => handleSetTray(brother.id, "T12", index)} /></td>
                            <td><FormCheck id={index.toString() + "T13"} onChange={(e) => handleSetTray(brother.id, "T13", index)} /></td>
                            <td><FormCheck id={index.toString() + "T15"} onChange={(e) => handleSetTray(brother.id, "T15", index)} /></td>
                            <td><FormCheck id={index.toString() + "T17"} onChange={(e) => handleSetTray(brother.id, "T17", index)} /></td>
                            <td><FormCheck id={index.toString() + "T19"} onChange={(e) => handleSetTray(brother.id, "T19", index)} /></td>
                            <td><FormCheck id={index.toString() + "T20"} onChange={(e) => handleSetTray(brother.id, "T20", index)} /></td>
                            <td><FormCheck id={index.toString() + "T21"} onChange={(e) => handleSetTray(brother.id, "T21", index)} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={handleSendLiturgistTray}>Zatwierdź</Button>
        </div>
    )

    return (
        isTrayAbleToSet ? <TrayPage /> : <MessageIfOfficeIsAlreadySet />
    )
}