import React, {useEffect, useState} from "react";
import { Button, FormCheck, Table } from "react-bootstrap";
import { getBaseBrothersForLiturgistOffice } from "./ApiConnection";
import { BaseBrotherLiturgist, getBrotherFromLocalStorage } from "./Brother";
import { MessageIfOfficeIsAlreadySet } from "./MessageIfOfficeIsAlreadySet";
import { getObstacleFromBrothers, IObstacleFromBrothers, OfficeName } from "./Obstacle";
import { BrotherDashboardOffice, ILastTray, getLastOffice, IOfficeLiturgistResponse, getLastTrays, addLiturgistOfficeTDB, isOfficeAbleToSet, IOfficeNames, getOfficeNames } from "./Offices";

export const LiturgistOffice = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrotherLiturgist> | null>();
    const [obstacles, setObstacles] = useState<Array<IObstacleFromBrothers> | null>();
    const [lastOffice, setLastOffice] = useState<Array<BrotherDashboardOffice> | null>()
    const [trays, setLastTrays] = useState<Array<ILastTray> | null>();
    const [officeNames, setOfficeNames] = useState<Array<IOfficeNames> | null>();
    const [isLiturgistOfficeAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()
    const [message, setMessage] = useState<string>()
    const officeInMass = ["MO", "MK", "MŚ", "KR", "TUR"]

    const brotherLocalStorage = getBrotherFromLocalStorage()
    const jwtToken = brotherLocalStorage.jwtToken;
    let offices = Array<IOfficeLiturgistResponse>()

    const RenderHeader = () => (
        <thead>
            <tr>
                <th>Lp</th>
                <th>Imię</th>
                <th>Naziwsko</th>
                {officeNames?.map((name) =>
                    <th key={name.id.toString() + name.officeName.toString()}>{name.officeName}</th>
                )}
            </tr>
        </thead>
    )

    const RenderBody = () => (
        <tbody>
            {brothers?.map((brother:BaseBrotherLiturgist, index) =>
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{brother.name}</td>
                <td>{brother.surname}</td>
                {officeNames?.map((office) => 
                    <td key={office.officeAdmin + office.id.toString()}><FormCheck id={index.toString() + office.officeName} onChange={(e) => handleSetLiturgistOffice(brother.id, office.officeName, index)} /></td>
                )}
                </tr>
            )}
        </tbody>
    )

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
            const officesNames = await getOfficeNames('LITURGIST');
            setOfficeNames(officesNames)
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
        const hasTrayOnConventualMass = trays?.find(item => item.idBrother === brotherId && item.brothersTrays.includes("10.30"));
        if(hasTrayOnConventualMass && isOfficeOnMass) {
            console.log('Nie może wziąć tego oficjum bo ma tacę o 10.30')
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

    const ShowTable = () => (
        <div className="table-center">
            <Table striped bordered hover variant="light">
                <RenderHeader />
                <RenderBody />
            </Table>
            <Button className="button-center" variant="success" onClick={handleAddLiturgistOffice}>Dodaj oficja</Button>
        </div>
    )

    const LiturgistPage = () => (
        <div>
            <h2 className="header-frame">Wyznaczanie oficjów liturgicznych</h2>
            <div className="message-body">{message}</div>
            <ShowTable />
        </div>
    )

    return (
        isLiturgistOfficeAbleToSet ? <LiturgistPage /> : <MessageIfOfficeIsAlreadySet />
    )
}