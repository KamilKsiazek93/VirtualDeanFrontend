import React, { useEffect, useState } from "react";
import { FormCheck, Table, Button } from "react-bootstrap";
import { getBaseBrothersForLiturgistOffice } from "./ApiConnection";
import { BaseBrotherLiturgist, getBrotherFromLocalStorage } from './Brother/Brother'
import { MessageIfOfficeIsAlreadySet } from "./MessageIfOfficeIsAlreadySet";
import { getObstacleFromBrothers, IObstacleFromBrothers } from "./Obstacle";
import { addDeanOfficeTDB, getKitchenOffice, getLastWeek, IDeanOfficeResponse, isOfficeAbleToSet, KitchenOfficeResp } from "./Offices";

export const DeanOffice = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrotherLiturgist> | null>()
    const [obstaclesFromBrother, setObstacleFromBrother] = useState<Array<IObstacleFromBrothers> | null>()
    const [kitchenOffice, setKitchenOffice] = useState<Array<KitchenOfficeResp> | null>()
    const [isDeanOfficeAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()
    const [message, setMessage] = useState<string>()

    const brotherLocalStorage = getBrotherFromLocalStorage()
    const jwtToken = brotherLocalStorage.jwtToken;
    let offices = Array<IDeanOfficeResponse>()

    useEffect(() => {
        const getData = async() => {
            const weekNumber = await getLastWeek();
            const brothers = await getBaseBrothersForLiturgistOffice()
            setBrothers(brothers)
            const obstaclesFromBrothers = await getObstacleFromBrothers()
            setObstacleFromBrother(obstaclesFromBrothers)
            const kitchenOffice = await getKitchenOffice(weekNumber);
            setKitchenOffice(kitchenOffice);
            const isDeanOfficeAbleToSet = await isOfficeAbleToSet('DEAN')
            setInfoAboutOfficeSet(isDeanOfficeAbleToSet)
        }
        getData()
    }, [])

    const handleSetDeanOffice = (brotherId:number, officeName:string, index:number) => {
        const id = index.toString() + officeName;
        if(isAvailableCheck(brotherId, officeName) && pushObjectToArrayTray(brotherId, officeName)) {
            setCheckboxValue(id, true)
        } else {
            setCheckboxValue(id, false)
        }
    }

    const isAvailableCheck = (brotherId:number, officeName:string):Boolean => {
        const isInBrotherObstacleList = obstaclesFromBrother?.find(item => item.brotherId === brotherId && 
            item.obstacles.find(o => o.includes(officeName)))
        if(isInBrotherObstacleList) {
            console.log("Brat zgłosił przeszkodę na to oficjum")
            return false
        }

        const hasBrotherKitchenOffice = kitchenOffice?.find(item => item.brotherId === brotherId &&
            item.saturdayOffices !== null && (officeName === "PR" || officeName === "SR"))
        if(hasBrotherKitchenOffice) {
            console.log("Brat ma oficjum kuchenne")
            return false
        }

        return true
    }

    const pushObjectToArrayTray = (brotherId:number, officeName:string):Boolean => {
        const objectExist = offices.find(office => office.brotherId === brotherId && office.deanOffice === officeName);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, deanOffice: officeName})
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
        const result = await addDeanOfficeTDB(offices, jwtToken)
        setMessage(result?.message)
    }

    const DeanPage = () => (
        <div>
            <h2 className="header-frame">Wyznaczanie oficjów dziekańskich</h2>
            <div className="message-body">{message}</div>
            <div className="table-center">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>PR</th>
                            <th>SR</th>
                            <th>KO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brothers?.map((brother:BaseBrotherLiturgist, index) => 
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck id={index.toString() + "PR"} onChange={(e) => handleSetDeanOffice(brother.id, "PR", index)} /></td>
                            <td><FormCheck id={index.toString() + "SR"} onChange={(e) => handleSetDeanOffice(brother.id, "SR", index)} /></td>
                            <td><FormCheck id={index.toString() + "KO"} onChange={(e) => handleSetDeanOffice(brother.id, "KO", index)} /></td>
                        </tr>
                        )}
                    </tbody>
                </Table>
                <Button className="button-center" variant="success" onClick={handleAddDeanOffice}>Dodaj oficja</Button>
            </div>
        </div>
    )

    return (
        isDeanOfficeAbleToSet ? <DeanPage /> : <MessageIfOfficeIsAlreadySet />
    )
}