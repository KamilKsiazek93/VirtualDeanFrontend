import React, { useState, useEffect } from "react";
import { webAPIUrl } from "../AppSettings";
import { BaseBrother } from "./Brother";
import { Table, FormCheck } from "react-bootstrap";

export const KitchenOffice = () => {
    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>(null);

    useEffect(() => {
        async function getBrothersFromDB() {
            let response = await fetch(`${webAPIUrl}/brothers-base`);
            let result : Array<BaseBrother> = await response.json();
            setBrothers(result);
        }
        getBrothersFromDB();
    }, [])

    const handleSaturdayOa = (e : any) => {
        console.log(e.target.value)
    }

    return (
        <div>
            <h1>Oficja kuchenne</h1>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th colSpan={3}></th>
                        <th colSpan={5}>Sobota</th>
                        <th colSpan={5}>Niedziela</th>
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
                            <td><FormCheck onChange={handleSaturdayOa} /></td>
                            <td><FormCheck /></td>
                            <td><FormCheck /></td>
                            <td><FormCheck /></td>
                            <td><FormCheck /></td>
                            <td><FormCheck /></td>
                            <td><FormCheck /></td>
                            <td><FormCheck /></td>
                            <td><FormCheck /></td>
                            <td><FormCheck /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}