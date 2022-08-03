import React, { useState, useEffect } from "react";
import { BaseBrother, getBrotherFromLocalStorage } from "./Brother";
import { Table, FormCheck, Button } from "react-bootstrap";
import { addKitchenOfficeToDB, getOfficeNames, IOfficeNames, isOfficeAbleToSet, KitchenOfficeResp } from "./Offices";
import { getBaseBrothersForLiturgistOffice } from "./ApiConnection";
import { MessageIfOfficeIsAlreadySet } from "./MessageIfOfficeIsAlreadySet";

export const KitchenOffice = () => {
    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>(null);
    const [message, setMessage] = useState<string>()
    const [officeNames, setOfficeNames] = useState<Array<IOfficeNames> | null>()
    const [isKitchenOfficeAbleToSet, setInfoAboutOfficeSet] = useState<Boolean>()
    const [numberOfKitchenOfficeInSingleDay, setNumberOfKitchenOffice] = useState<number>();

    const brotherLocalStorage = getBrotherFromLocalStorage()
    const jwtToken = brotherLocalStorage.jwtToken;
    let offices = Array<KitchenOfficeResp>();

    const RenderHeader = () => (
        <thead>
            <tr>
                <th colSpan={3}></th>
                <th colSpan={numberOfKitchenOfficeInSingleDay}>Sobota</th>
                <th colSpan={numberOfKitchenOfficeInSingleDay}>Niedziela</th>
            </tr>
            <tr>
                <th>Lp</th>
                <th>Imię</th>
                <th>Naziwsko</th>
                {officeNames?.map((name) =>
                    <th key={name.id.toString() + name.officeName.toString() + "SATURDAY"}>{name.officeName}</th>
                )}
                {officeNames?.map((name) =>
                    <th key={name.id.toString() + name.officeName.toString() + "SUNDAY"}>{name.officeName}</th>
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
                {officeNames?.map((office) => 
                    <td key={office.officeAdmin + office.id.toString()}><FormCheck id={index.toString() + office.officeName} onChange={(e) => handleSetKitchenOffice(brother.id, "saturday", office.officeName)} /></td>
                )}
                {officeNames?.map((office) => 
                    <td key={office.officeAdmin + office.id.toString()}><FormCheck id={index.toString() + office.officeName} onChange={(e) => handleSetKitchenOffice(brother.id, "sunday", office.officeName)} /></td>
                )}
                </tr>
            )}
        </tbody>
    )

    useEffect(() => {
        const getBrothersFromDB = async() => {
            const brothers = await getBaseBrothersForLiturgistOffice()
            setBrothers(brothers)
            const officesNames = await getOfficeNames('KITCHEN')
            setOfficeNames(officesNames)
            setNumberOfKitchenOffice(officeNames?.length ?? 5)
            const isKitchenOfficeAbleToSet = await isOfficeAbleToSet('KITCHEN')
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

    const ShowKitchenTable = () => (
        <div className="table-center">
            <Table striped bordered hover variant="light">
                <RenderHeader />
                <RenderBody />
            </Table>
            <Button onClick={handleSendOffice}>Zatwierdź</Button>
        </div>
    )

    const KitchenPage = () => (
        <div>
            <h2 className="header-frame">Oficja kuchenne</h2>
            <div className="message-body">{message}</div>
            <ShowKitchenTable />
        </div>
    )

    return (
        isKitchenOfficeAbleToSet ? <KitchenPage /> : <MessageIfOfficeIsAlreadySet />
    )
}