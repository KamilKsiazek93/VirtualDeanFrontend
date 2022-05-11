import React, { useEffect, useState } from "react";
import { Table, FormCheck, Button } from "react-bootstrap";
import { getBrothersForCommunion } from "./ApiConnection";
import { BaseBrother } from "./Brother";
import { getObstacleFromBrothers, IObstacleFromBrothers } from "./Obstacle";
import { addCommunionToDB, ICommunionHourResponse } from "./Offices";

export const AddCommunion = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>()
    const [obstaclesFromBrothers, setObstaclesFromBrothers] = useState<Array<IObstacleFromBrothers> | null>()
    const [message, setMessage] = useState<string>()

    let offices = Array<ICommunionHourResponse>()

    useEffect(() => {
        const getData = async() => {
            const brothers = await getBrothersForCommunion()
            setBrothers(brothers)
            const obstaclesFromBrothers = await getObstacleFromBrothers()
            setObstaclesFromBrothers(obstaclesFromBrothers)
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
            console.log("Brat zgłosił przeszkodę na to oficjum")
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
        console.log(result)
    }

    return (
        <div>
            <h2 className="header-frame">Wyznacz komunie</h2>
            <div className="message-body">{message}</div>
            <Table striped bordered hover variant="light">
            <thead>
                    <tr>
                        <th>Lp</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>8.00</th>
                        <th>9.00</th>
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
                    {brothers?.map((brother:BaseBrother, index:number) =>
                    <tr key={index}>
                        <td>{index+1}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck id={index.toString() + "K8"} onChange={(e) => handleSetCommunion(brother.id, "K8", index)} /></td>
                            <td><FormCheck id={index.toString() + "K9"} onChange={(e) => handleSetCommunion(brother.id, "K9", index)} /></td>
                            <td><FormCheck id={index.toString() + "K12"} onChange={(e) => handleSetCommunion(brother.id, "K12", index)} /></td>
                            <td><FormCheck id={index.toString() + "K13"} onChange={(e) => handleSetCommunion(brother.id, "K13", index)} /></td>
                            <td><FormCheck id={index.toString() + "K15"} onChange={(e) => handleSetCommunion(brother.id, "K15", index)} /></td>
                            <td><FormCheck id={index.toString() + "K17"} onChange={(e) => handleSetCommunion(brother.id, "K17", index)} /></td>
                            <td><FormCheck id={index.toString() + "K19"} onChange={(e) => handleSetCommunion(brother.id, "K19", index)} /></td>
                            <td><FormCheck id={index.toString() + "K20"} onChange={(e) => handleSetCommunion(brother.id, "K20", index)} /></td>
                            <td><FormCheck id={index.toString() + "K21"} onChange={(e) => handleSetCommunion(brother.id, "K21", index)} /></td>
                    </tr>
                    )}
                </tbody>
            </Table>
            <Button className="button-center" variant="success" onClick={handleAddDeanOffice}>Dodaj oficja</Button>
        </div>
    )
}