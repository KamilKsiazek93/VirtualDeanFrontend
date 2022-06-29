import React, { useEffect, useState } from "react";
import { Table, Button, FormCheck } from "react-bootstrap";
import { getBaseBrotherForTray } from "./ApiConnection";
import { BaseBrother, getBrotherFromLocalStorage } from "./Brother";
import { MessageIfOfficeIsAlreadySet } from "./MessageIfOfficeIsAlreadySet";
import { getObstacleBetweenOffices, getObstacleFromBrothers, IObstacleFromBrothers, ObstacleBetweenOffice } from "./Obstacle";
import { addTrayToDB, FlatOffice, getHoursForTray, getKitchenOffice, getLastFlatOffice, getLastWeek, isOfficeAbleToSet, ITrayHourResponse, KitchenOfficeResp } from "./Offices";

export const AddTray = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>();
    const [obstacles, setObstacles] = useState<Array<IObstacleFromBrothers> | null>();
    const [lastOffice, setLastOffice] = useState<Array<FlatOffice> | null>()
    const [hoursTray, setHoursTray] = useState<Array<string> | null>()
    const [kitchenOffice, setKitchenOffice] = useState<Array<KitchenOfficeResp> | null>()
    const [obstacleBetweenOffices, setObstacleBetweenOffices] = useState<Array<ObstacleBetweenOffice> | null>()
    const [isTrayAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()
    const [message, setMessage] = useState<string>()

    const brotherLocalStorage = getBrotherFromLocalStorage()
    const jwtToken = brotherLocalStorage.jwtToken;
    let offices = Array<ITrayHourResponse>()

    const RenderHeader = () => (
        <thead>
            <tr>
                <th>Lp</th>
                <th>Imię</th>
                <th>Naziwsko</th>
                {hoursTray?.map((hour) =>
                    <th key={hour.toString()}>{hour}</th>
                )}
            </tr>
        </thead>
    )

    const RenderBody = () => (
        <tbody>
            {brothers?.map((brother:BaseBrother, index) =>
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{brother.name}</td>
                <td>{brother.surname}</td>
                {hoursTray?.map((hour, indexTray) => 
                    <td key={hour.toString() + index.toString()}><FormCheck id={index.toString() + hour} onChange={(e) => handleSetTray(brother.id, hour, index)} /></td>
                )}
                </tr>
            )}
        </tbody>
    )

    useEffect(() => {
        async function getData() {
            const weekNumber = await getLastWeek();
            const brothers = await getBaseBrotherForTray()
            setBrothers(brothers)
            const obstacles = await getObstacleFromBrothers();
            setObstacles(obstacles)
            const lastOffice = await getLastFlatOffice(weekNumber);
            setLastOffice(lastOffice)
            const hoursTray = await getHoursForTray();
            setHoursTray(hoursTray)
            const kitchenOffice = await getKitchenOffice(weekNumber);
            setKitchenOffice(kitchenOffice);
            const obstacleBetweenOffices = await getObstacleBetweenOffices();
            setObstacleBetweenOffices(obstacleBetweenOffices);
            const isTrayAvailableToSet = await isOfficeAbleToSet('/pipeline-status/TRAY')
            setInfoAboutOfficeSet(isTrayAvailableToSet)
        }
        getData()
    }, [])

    const handleSendLiturgistTray = async() => {
        const result = await addTrayToDB(offices, jwtToken)
        setMessage(result?.message)
    }

    const pushObjectToArrayTray = (brotherId:number, trayHour:string) => {
        const objectExist = offices.find(office => office.brotherId === brotherId && office.trayHour === trayHour);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, trayHour})
            return true
        } else {
            offices = offices.filter(office => office !== objectExist)
            return false
        }
    }

    const setCheckboxValue = (id:string, value:boolean):void => {
        let checkedBox = document.getElementById(id) as HTMLInputElement
        checkedBox.checked = value
    }

    const handleSetTray = (brotherId:number, trayHour:string, index:number) => {
        const id = index.toString() + trayHour
        if(isAvailableCheck(id, brotherId, trayHour) && pushObjectToArrayTray(brotherId, trayHour)) {
            setCheckboxValue(id, true)
        } else {
            setCheckboxValue(id, false)
        }
    }

    const isAvailableCheck = (id:string, brotherId:number, trayHour:string):Boolean => {

        const isObstacled = obstacles?.filter(item => item.brotherId === brotherId && item.obstacles.find(obstacle => obstacle === trayHour)).length ?? 0
        if(isObstacled > 0) {
            console.log('Nie może wziąć tego oficjum - zgłosił przeszkodę')
            return false
        }

        const obstacleOfficeConnected = lastOffice?.find(item => item.brotherId === brotherId && (item.officeName === "PS" || item.officeName === "S"))
        if(obstacleOfficeConnected && trayHour === "10.30") {
            console.log('Nie może wziąć tego oficjum - śpiewa w scholi')
            return false
        }

        const hasBrotherKitchenOffice = kitchenOffice?.find(item => item.brotherId === brotherId &&
            item.sundayOffices !== null && trayHour === "12.00")
        if(hasBrotherKitchenOffice) {
            console.log("Brat ma oficjum kuchenne")
            return false
        }

        return true;
    }

    const ShowTable = () => (
        <div className="table-center">
            <Table striped bordered hover variant="light">
                <RenderHeader />
                <RenderBody />
            </Table>
            <Button onClick={handleSendLiturgistTray}>Zatwierdź</Button>
        </div>
    )

    const TrayPage = () => (
        <div>
            <h2 className="header-frame">Wyznaczanie tacy</h2>
            <div className="message-body">{message}</div>
            <ShowTable />
        </div>
    )

    return (
        isTrayAbleToSet ? <TrayPage /> : <MessageIfOfficeIsAlreadySet />
    )
}