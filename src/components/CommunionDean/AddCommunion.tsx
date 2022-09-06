import React, { useEffect, useState } from "react";
import { Table, FormCheck, Button } from "react-bootstrap";
import { getBrothersForCommunion } from "../ApiConnection";
import { BaseBrother } from "../Brother/Brother";
import { MessageIfOfficeIsAlreadySet } from "../MessageIfOfficeIsAlreadySet";
import { getObstacleFromBrothers, IObstacleFromBrothers } from "../Obstacle";
import { addCommunionToDB, getHoursForCommunion, getKitchenOffice, getLastWeek, ICommunionHourResponse, isOfficeAbleToSet, KitchenOfficeResp } from "../Offices";

export const AddCommunion = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>()
    const [obstaclesFromBrothers, setObstaclesFromBrothers] = useState<Array<IObstacleFromBrothers> | null>()
    const [hoursCommunion, setHoursCommunion] = useState<Array<string> | null>()
    const [kitchenOffice, setKitchenOffice] = useState<Array<KitchenOfficeResp> | null>()
    const [isCommunionAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()
    const [message, setMessage] = useState<string>()

    let offices = Array<ICommunionHourResponse>()

    const RenderHeader = () => (
        <thead>
            <tr>
                <th>Lp</th>
                <th>Imię</th>
                <th>Naziwsko</th>
                {hoursCommunion?.map((hour) =>
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
                {hoursCommunion?.map((hour, indexCommunion) => 
                    <td key={hour.toString() + index.toString()}><FormCheck id={index.toString() + hour} onChange={(e) => handleSetCommunion(brother.id, hour, index)} /></td>
                )}
                </tr>
            )}
        </tbody>
    )

    useEffect(() => {
        const getData = async() => {
            const weekNumber = await getLastWeek();
            const brothers = await getBrothersForCommunion()
            setBrothers(brothers)
            const obstaclesFromBrothers = await getObstacleFromBrothers()
            setObstaclesFromBrothers(obstaclesFromBrothers)
            const hoursCommunion = await getHoursForCommunion();
            setHoursCommunion(hoursCommunion)
            const kitchenOffice = await getKitchenOffice(weekNumber);
            setKitchenOffice(kitchenOffice);
            const isTrayAvailableToSet = await isOfficeAbleToSet('COMMUNION')
            setInfoAboutOfficeSet(isTrayAvailableToSet)
        }
        getData()
    }, [])

    const handleSetCommunion = (brotherId:number, officeName:string, index:number) => {
        const id = index.toString() + officeName;
        if(isAvailableCheck(brotherId, officeName) && pushObjectToArrayTray(brotherId, officeName)) {
            setCheckboxValue(id, true)
        } else {
            setCheckboxValue(id, false)
        }
    }

    const isAvailableCheck = (brotherId:number, officeName:string):Boolean => {
        const isInBrotherObstacleList = obstaclesFromBrothers?.find(item => item.brotherId === brotherId && 
            item.obstacles.find(o => o.includes(officeName)))
        if(isInBrotherObstacleList) {
            setMessage("Brat zgłosił przeszkodę na to oficjum")
            return false
        }
        const hasBrotherKitchenOffice = kitchenOffice?.find(item => item.brotherId === brotherId &&
            item.sundayOffices !== null && officeName === "12.00")
        if(hasBrotherKitchenOffice) {
            console.log("Brat ma oficjum kuchenne")
            return false
        }
        return true
    }

    const pushObjectToArrayTray = (brotherId:number, officeName:string):Boolean => {
        const objectExist = offices.find(office => office.brotherId === brotherId && office.communionHour === officeName);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, communionHour: officeName})
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

    const handleAddDeanOffice = async() => {
        const result = await addCommunionToDB(offices)
        setMessage(result?.message)
    }

    const ShowTable = () => (
        <div className="table-center">
            <Table striped bordered hover variant="light">
                <RenderHeader />
                <RenderBody />
            </Table>
            <Button className="button-center" variant="success" onClick={handleAddDeanOffice}>Dodaj oficja</Button>
        </div>
    )

    const CommunionPage = () => (
        <div>
            <h2 className="header-frame">Wyznacz komunie</h2>
            <div className="message-body">{message}</div>
            <ShowTable />
        </div>
    )

    return (
        isCommunionAbleToSet ? <CommunionPage /> : <MessageIfOfficeIsAlreadySet />
    )
}