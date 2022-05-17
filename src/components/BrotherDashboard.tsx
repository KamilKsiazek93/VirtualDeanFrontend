import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getBrotherFromLocalStorage } from "./Brother";
import { BrotherDashboardOffice, getLastOfficeForBrother, getPreviousOfficeForBrother } from "./Offices";

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

    const [brotherOfficeLast, setBrotherOfficeLast] = useState<BrotherDashboardOffice>()
    const [brotherOfficePrevious, setBrotherOfficePrevious] = useState<BrotherDashboardOffice>()

    useEffect(() => {
        const getData = async() => {
            const officesLast = await getLastOfficeForBrother(brotherLocalStorage.id)
            setBrotherOfficeLast(officesLast)
            const officesPrevious = await getPreviousOfficeForBrother(brotherLocalStorage.id)
            setBrotherOfficePrevious(officesPrevious)
        }
        getData()
    }, [])

    return (
        <div>
            <h2 className="header-frame">Dzień dobry {name} {surname}!</h2>
            <div className="table-center">
                <h3>Poprzednie oficja:</h3>
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
                        <tr key="previous">
                            <td>{brotherOfficePrevious?.cantorOffice}</td>
                            <td>{brotherOfficePrevious?.liturgistOffice}</td>
                            <td>{brotherOfficePrevious?.deanOffice}</td>
                            <td>{showOffice(brotherOfficePrevious?.tray)}</td>
                            <td>{showOffice(brotherOfficePrevious?.communion)}</td>
                        </tr>
                    </tbody>
                </Table>
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
                        <tr key="current">
                            <td>{brotherOfficeLast?.cantorOffice}</td>
                            <td>{brotherOfficeLast?.liturgistOffice}</td>
                            <td>{brotherOfficeLast?.deanOffice}</td>
                            <td>{showOffice(brotherOfficeLast?.tray)}</td>
                            <td>{showOffice(brotherOfficeLast?.communion)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}