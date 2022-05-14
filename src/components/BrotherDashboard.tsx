import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {  } from "react-redux";
import { getBrotherFromLocalStorage } from "./Brother";
import { BrotherDashboardOffice, getLastOfficeForBrother } from "./Offices";

const showOffice = (office:Array<string> | undefined) => {
    office = office?.map((item) => item.slice(1)).sort()
    return (
        <ul>
            {office?.map((item) =>
                <li key={item}>{item}</li>
            )}
        </ul>
    )
}

export const BrotherDashboard = () => {
    const brotherLocalStorage = getBrotherFromLocalStorage()
    const name = brotherLocalStorage.name
    const surname = brotherLocalStorage.surname

    const [brotherOffice, setBrotherOffice] = useState<BrotherDashboardOffice>()

    useEffect(() => {
        const getData = async() => {
            const offices = await getLastOfficeForBrother(brotherLocalStorage.id)
            setBrotherOffice(offices)
        }
        getData()
    }, [])

    return (
        <div>
            <h2 className="header-frame">Dzień dobry {name} {surname}!</h2>
            <div className="table-center">
                <h3>Twoje oficja w najbliższym czasie:</h3>
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Schola</th>
                            <th>Liturgia</th>
                            <th>Dziekan</th>
                            <th>Taca</th>
                            <th>Komunia</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key="1">
                            <td>{brotherOffice?.cantorOffice}</td>
                            <td>{brotherOffice?.liturgistOffice}</td>
                            <td>{brotherOffice?.deanOffice}</td>
                            <td>{showOffice(brotherOffice?.tray)}</td>
                            <td>{showOffice(brotherOffice?.communion)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}