import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getLastOffice, WeeklyOffices } from "../Offices";

export const DeanPrintedOffices = () => {

    const [offices, setOffices] = useState<Array<WeeklyOffices> | null>()

    useEffect(() => {
        const getData = async() => {
            const weeklyOffices = await getLastOffice()
            setOffices(weeklyOffices)
        }
        getData()
    }, [])

    const showOffice = (office:Array<string> | undefined) => {
        office = office?.map((item) => item).sort()
        return (
            <ul>
                {office?.map((item) =>
                    <li key={item}>{item}</li>
                )}
            </ul>
        )
    }

    const RenderHeader = () => (
        <thead>
            <tr>
                <th>Lp</th>
                <th>Imię</th>
                <th>Naziwsko</th>
                <th>Schola</th>
                <th>Liturgia</th>
                <th>Dziekan</th>
                <th>Taca</th>
                <th>Komunia</th>
            </tr>
        </thead>
    )

    const RenderBody = () => (
        <tbody>
            {offices?.map((office, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{office.name}</td>
                    <td>{office.surname}</td>
                    <td>{office.cantorOffice}</td>
                    <td>{office.liturgistOffice}</td>
                    <td>{office.deanOffice}</td>
                    <td>{showOffice(office?.tray)}</td>
                    <td>{showOffice(office?.communion)}</td>
                </tr>
            )}
        </tbody>
    )

    const ShowTable = () => (
        <Table striped bordered hover variant="light">
            <RenderHeader />
            <RenderBody />
        </Table>
    )

    return (
        <div>
            <h2 className="header-frame">Oficja tygodniowe</h2>
            <div className="table-center">
                <ShowTable />
            </div>
        </div>
    )
}