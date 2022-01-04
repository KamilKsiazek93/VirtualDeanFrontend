import React, { useEffect, useState } from "react";
import { webAPIUrl } from "../AppSettings";
import { SingingBrothers } from "./Brother";
import { CantorOfficeResponse } from "./Offices";
import { FormCheck, Table, Button } from 'react-bootstrap';

export const Schola = () => {

    const [brothers, setBrothers] = useState<Array<SingingBrothers> | null>(null);
    let offices = Array<CantorOfficeResponse>();

    useEffect(() => {
        async function getSingingBrothersFromDb() {
            const response = await fetch(`${webAPIUrl}/brothers-singing`);
            const result : Array<SingingBrothers> = await response.json();
            setBrothers(result);
        }
        getSingingBrothersFromDb();
    }, []);

    const handleOffice = (idBrother:number, officeName:string) => {
        const objectExist = offices.find(office => office.idBrother === idBrother && office.officeName === officeName);
        if(!objectExist?.idBrother) {
            offices.push({idBrother, officeName})
        } else {
            offices = offices.filter(office => office !== objectExist)
        }
    }

    const handleSendCantorOffice = () => {
        fetch(`${webAPIUrl}/office-singing`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(offices)
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    return (
        <div>Wyznacz scholę
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
            <Button onClick={handleSendCantorOffice}>Zatwierdź</Button>
        </div>
    )
}