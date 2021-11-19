import React, { useState, useEffect } from "react";
import { webAPIUrl } from "../AppSettings";
import { BaseBrother } from "./Brother";
import { Table, FormCheck, Button } from "react-bootstrap";
import { KitchenOfficeResp } from "./Offices";

export const KitchenOffice = () => {
    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>(null);
    //const [office, setKitchenOffice] = useState<KitchenOfficeResp[]>([]);
    let offices = Array<KitchenOfficeResp>();

    const numberOfKitchenOfficeInSungleDay = 5;

    useEffect(() => {
        async function getBrothersFromDB() {
            let response = await fetch(`${webAPIUrl}/brothers-base`);
            let result : Array<BaseBrother> = await response.json();
            setBrothers(result);
        }
        getBrothersFromDB();
    }, [])

    const handleSendOffice = () => {
        fetch(`${webAPIUrl}/kitchen-offices`, {
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

    const handleSaturdayOa = (brotherId:number, day:string, officeName:string) => {
       
        // 1. Sprawdź, czy zarejestrować czy odjąć ze stanu (jeśli to odznacznie checkboxa -> mapowanie)
        // 2. Oznacz pozostałe checkboxy z kolumny jako disabled lub usuń atrybut disabled

        // setKitchenOffice(offices => [
        //     ...offices, {idBrother, officeName, day}
        // ]);
        const objectExist = offices.find(office => office.brotherId === brotherId && office.officeName === officeName && office.day === day);
        if(!objectExist?.brotherId) {
            offices.push({brotherId, officeName, day})
        } else {
            offices = offices.filter(office => office !== objectExist)
        }
        console.log(offices)
    }
    //console.log(offices)

    return (
        <div>
            <h1>Oficja kuchenne</h1>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th colSpan={3}></th>
                        <th colSpan={numberOfKitchenOfficeInSungleDay}>Sobota</th>
                        <th colSpan={numberOfKitchenOfficeInSungleDay}>Niedziela</th>
                    </tr>
                    <tr>
                        <th>Lp</th>
                        <th>Imie</th>
                        <th>Nazwisko</th>
                        <th>Oa</th>
                        <th>Ob</th>
                        <th>W</th>
                        <th>Zm</th>
                        <th>Zw</th>
                        <th>Oa</th>
                        <th>Ob</th>
                        <th>W</th>
                        <th>Zm</th>
                        <th>Zw</th>
                    </tr>
                </thead>
                <tbody>
                    {brothers?.map((brother, index) =>
                        <tr key={index}>
                            <td>{brother.id}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "saturday", "Oa")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "saturday", "Ob")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "saturday", "W")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "saturday", "Zm")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "saturday", "Zw")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "sunday", "Oa")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "sunday", "Ob")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "sunday", "W")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "sunday", "Zm")} /></td>
                            <td><FormCheck onChange={(e) => handleSaturdayOa(brother.id, "sunday", "Zw")} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={handleSendOffice}>Zatwierdź</Button>
        </div>
    )
}