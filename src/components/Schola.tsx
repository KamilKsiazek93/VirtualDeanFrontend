import React, { useEffect, useState } from "react";
import { webAPIUrl } from "../AppSettings";
import { SingingBrothers } from "./Brother";
import { addScholaToDb, CantorOfficeResponse } from "./Offices";
import { FormCheck, Table, Button } from 'react-bootstrap';

export const Schola = () => {

    const [brothers, setBrothers] = useState<Array<SingingBrothers> | null>(null);
    const [message, setMessage] = useState<string>()
    let offices = Array<CantorOfficeResponse>();

    useEffect(() => {
        async function getSingingBrothersFromDb() {
            const response = await fetch(`${webAPIUrl}/brothers-singing`);
            const result : Array<SingingBrothers> = await response.json();
            setBrothers(result);
        }
        getSingingBrothersFromDb();
    }, []);

    const handleOffice = (brotherId:number, cantorOffice:string) => {
        const objectExist = offices.find(office => office.brotherId === brotherId && office.cantorOffice === cantorOffice);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, weekOfOffices: 0, cantorOffice})
        } else {
            offices = offices.filter(office => office !== objectExist)
        }
    }

    const handleSendCantorOffice = async() => {
        const result = await addScholaToDb(offices);
        setMessage(result?.message)
        console.log(result);
    }

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
                                <td><FormCheck onChange={() => handleOffice(brother.id, "S")} /></td>
                                <td><FormCheck onChange={() => handleOffice(brother.id, "PS")} /></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Button className="button-center" variant="success" onClick={handleSendCantorOffice}>Zatwierdź</Button>
            </div>
        </div>
    )
}