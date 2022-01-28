import React from "react";
import { Table } from "react-bootstrap";
import {  } from "react-redux";
import { getBrotherFromLocalStorage } from "./Brother";

export const BrotherDashboard = () => {
    const brotherLocalStorage = getBrotherFromLocalStorage()

    const name = brotherLocalStorage.name
    const surname = brotherLocalStorage.surname
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}