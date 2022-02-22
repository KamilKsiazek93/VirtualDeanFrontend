import React, { useEffect, useState } from "react";
import { Table, Button, FormCheck } from "react-bootstrap";
import { getBaseBrotherForTray } from "./ApiConnection";
import { BaseBrother } from "./Brother";
import { getObstacleBetweenOffices, getObstacleFromBrothers, IObstacleFromBrothers, ObstacleBetweenOffice } from "./Obstacle";
import { ITrayHourResponse } from "./Offices";

export const AddTray = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>();
    const [obstacles, setObstacles] = useState<Array<IObstacleFromBrothers> | null>();
    const [obstaclesBetweenOffices, setObstacleBetweenOffices] = useState<Array<ObstacleBetweenOffice> | null>()

    let offices = Array<ITrayHourResponse>()

    useEffect(() => {
        async function getData() {
            const brothers = await getBaseBrotherForTray()
            setBrothers(brothers)
            const obstacles = await getObstacleFromBrothers();
            setObstacles(obstacles)
            const obstacleBetweenOffices = await getObstacleBetweenOffices();
            setObstacleBetweenOffices(obstacleBetweenOffices)
        }
        getData()
    }, [])


    const handleSendLiturgistTray = () => {
        console.log('send!')
    }

    const handleSetTray = (brotherId:number, trayHour:string) => {
        const objectExist = offices.find(office => office.brotherId === brotherId && office.trayHour === trayHour);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, trayHour})
        } else {
            offices = offices.filter(office => office !== objectExist)
        }
    }

    // const isAvailableCheck = (hour:string) => {
    //     switch (hour) {
    //         case "8.00":
    //             return false
    //         case "9.00":
    //             return false
    //     }
    // }

    return (
        <div>Wyznaczanie tacy
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
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T8")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T9")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T10")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T12")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T13")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T15")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T17")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T19")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T20")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "T21")} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={handleSendLiturgistTray}>Zatwierdź</Button>
        </div>
    )
}