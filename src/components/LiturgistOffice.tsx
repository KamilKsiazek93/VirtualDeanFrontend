import React, {useEffect, useState} from "react";
import { Button, FormCheck, Table } from "react-bootstrap";
import { getBaseBrothersForLiturgistOffice } from "./ApiConnection";
import { BaseBrotherLiturgist, getBrotherFromLocalStorage } from "./Brother";
import { MessageIfOfficeIsAlreadySet } from "./MessageIfOfficeIsAlreadySet";
import { getObstacleFromBrothers, IObstacleFromBrothers } from "./Obstacle";
import { BrotherDashboardOffice, ILastTray, getLastOffice, IOfficeLiturgistResponse, getLastTrays, addLiturgistOfficeTDB, isOfficeAbleToSet } from "./Offices";

export const LiturgistOffice = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrotherLiturgist> | null>();
    const [obstacles, setObstacles] = useState<Array<IObstacleFromBrothers> | null>();
    const [lastOffice, setLastOffice] = useState<Array<BrotherDashboardOffice> | null>()
    const [trays, setLastTrays] = useState<Array<ILastTray> | null>();
    const [isLiturgistOfficeAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()
    const [message, setMessage] = useState<string>()
    const officeInMass = ["MO", "MK", "MŚ", "KR", "Tur"]

    const brotherLocalStorage = getBrotherFromLocalStorage()
    const jwtToken = brotherLocalStorage.jwtToken;
    let offices = Array<IOfficeLiturgistResponse>()

    useEffect(() => {
        async function getData() {
            const brothers = await getBaseBrothersForLiturgistOffice();
            setBrothers(brothers)
            const obstacles = await getObstacleFromBrothers();
            setObstacles(obstacles)
            const lastOffice = await getLastOffice();
            setLastOffice(lastOffice)
            const lastTrays = await getLastTrays();
            setLastTrays(lastTrays)
            const isLiturgistOfficeAvailableToSet = await isOfficeAbleToSet('/pipeline-status/LITURGIST')
            setInfoAboutOfficeSet(isLiturgistOfficeAvailableToSet)
        }
        getData()
    }, [])

    const checkIsOfficeOnMass = (officeName:string):Boolean => {
        return officeInMass.includes(officeName);
    }

    const setCheckboxValue = (id:string, value:boolean):void => {
        let checkedBox = document.getElementById(id) as HTMLInputElement
        checkedBox.checked = value
    }

    const handleSetLiturgistOffice = (brotherId:number, officeName:string, index:number) => {
        const id = index.toString() + officeName;
        if(isAvailableCheck(brotherId, officeName) && pushObjectToArrayTray(brotherId, officeName)) {
            setCheckboxValue(id, true)
        } else {
            setCheckboxValue(id, false)
        }
    }

    const isAvailableCheck = (brotherId:number, officeName:string):Boolean => {

        const isObstacled = obstacles?.filter(item => item.brotherId === brotherId && item.obstacles.find(obstacle => obstacle === officeName)).length ?? 0
        const isOfficeOnMass = checkIsOfficeOnMass(officeName)
        if(isObstacled > 0) {
            console.log('Nie może wziąć tego oficjum bo zgłosił przeszkodę')
            return false
        }
        const isSinging = lastOffice?.find(item => item.brotherId === brotherId && item.cantorOffice !== null)
        if(isSinging && isOfficeOnMass) {
            console.log('Nie może wziąć tego oficjum bo śpiewa w scholi')
            return false
        }
        const hasTrayOnConventualMass = trays?.find(item => item.idBrother === brotherId && item.brothersTrays.includes("T10"));
        if(hasTrayOnConventualMass && isOfficeOnMass) {
            console.log('Nie może wziąć tego oficjum bo ma tacę  10')
            return false
        }
        if((officeName === "MO" || officeName === "MK") && brothers?.find(bro => bro.id === brotherId && bro.isAcolit === false)) {
            console.log('Nie może wziąć, bo nie jest akolitą')
            return false
        }
        
        return true
    }

    const pushObjectToArrayTray = (brotherId:number, officeName:string) => {
        const objectExist = offices.find(office => office.brotherId === brotherId && office.liturgistOffice === officeName);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, liturgistOffice: officeName})
            return true
        } else {
            offices = offices.filter(office => office !== objectExist)
            return false
        }
    }

    const handleAddLiturgistOffice = async() => {
        const result = await addLiturgistOfficeTDB(offices, jwtToken)
        setMessage(result?.message)
    }

    const LiturgistPage = () => (
        <div>
            <h2 className="header-frame">Wyznaczanie oficjów liturgicznych</h2>
            <div className="message-body">{message}</div>
            <div className="table-center">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Imię</th>
                            <th>Naziwsko</th>
                            <th>MO</th>
                            <th>MK</th>
                            <th>MŚ</th>
                            <th>KR</th>
                            <th>Tur</th>
                            <th>Suc1</th>
                            <th>Suc2</th>
                            <th>Resp1</th>
                            <th>Resp2</th>
                            <th>Ant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brothers?.map((brother:BaseBrotherLiturgist, index) => 
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck id={index.toString() + "MO"} onChange={(e) => handleSetLiturgistOffice(brother.id, "MO", index)} /></td>
                            <td><FormCheck id={index.toString() + "MK"} onChange={(e) => handleSetLiturgistOffice(brother.id, "MK", index)} /> </td>
                            <td><FormCheck id={index.toString() + "MŚ"} onChange={(e) => handleSetLiturgistOffice(brother.id, "MŚ", index)} /> </td>
                            <td><FormCheck id={index.toString() + "KR"} onChange={(e) => handleSetLiturgistOffice(brother.id, "KR", index)} /> </td>
                            <td><FormCheck id={index.toString() + "Tur"} onChange={(e) => handleSetLiturgistOffice(brother.id, "Tur", index)} /> </td>
                            <td><FormCheck id={index.toString() + "Suc1"} onChange={(e) => handleSetLiturgistOffice(brother.id, "Suc1", index)} /> </td>
                            <td><FormCheck id={index.toString() + "Suc2"} onChange={(e) => handleSetLiturgistOffice(brother.id, "Suc2", index)} /> </td>
                            <td><FormCheck id={index.toString() + "Resp1"} onChange={(e) => handleSetLiturgistOffice(brother.id, "Resp1", index)} /> </td>
                            <td><FormCheck id={index.toString() + "Resp2"} onChange={(e) => handleSetLiturgistOffice(brother.id, "Resp2", index)} /> </td>
                            <td><FormCheck id={index.toString() + "Ant"} onChange={(e) => handleSetLiturgistOffice(brother.id, "Ant", index)} /> </td>
                        </tr>
                        )}
                    </tbody>
                </Table>
                <Button className="button-center" variant="success" onClick={handleAddLiturgistOffice}>Dodaj oficja</Button>
            </div>
        </div>
    )

    return (
        isLiturgistOfficeAbleToSet ? <LiturgistPage /> : <MessageIfOfficeIsAlreadySet />
    )
}