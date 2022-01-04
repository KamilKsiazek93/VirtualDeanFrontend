import React, { useEffect } from "react";
import { Table, Button, FormCheck } from "react-bootstrap";
import { webAPIUrl } from "../AppSettings";
import { BaseBrother } from "./Brother";

export const AddTray = () => {

    const [brothers, setBrothers] = React.useState<Array<BaseBrother> | null>(null);

    useEffect(() => {
        async function getTrayBrothersFromDb() {
            const response = await fetch(`${webAPIUrl}/brothers-tray`);
            const result : Array<BaseBrother> = await response.json();
            setBrothers(result);
        }
        getTrayBrothersFromDb()
    }, [])

    const handleSendLiturgistTray = () => {
        console.log('send!')
    }

    const handleSetTray = (brotherId:number, trayHour:string) => {
        console.log(trayHour)
    }

    const isAvailableCheck = (hour:string) => {
        switch (hour) {
            case "8.00":
                return false
            case "9.00":
                return false
        }
    }

    return (
        <div>Wyznaczanie tacy
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Lp</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>8.00</th>
                        <th>9.00</th>
                        <th>10.30</th>
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
                    {brothers?.map((brother:BaseBrother, index:any) => 
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck checked={isAvailableCheck("8.00")} onChange={(e) => handleSetTray(brother.id, "8.00")} /></td>
                            <td><FormCheck checked={isAvailableCheck("9.00")} onChange={(e) => handleSetTray(brother.id, "9.00")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "10.30")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "12.00")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "13.30")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "15.30")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "17.00")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "19.00")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "20.20")} /></td>
                            <td><FormCheck onChange={(e) => handleSetTray(brother.id, "21.30")} /></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Button onClick={handleSendLiturgistTray}>Zatwierdź</Button>
        </div>
    )
}