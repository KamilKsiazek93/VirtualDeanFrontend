import React, { useEffect, useState } from "react";
import { FormCheck, Table } from "react-bootstrap";
import { getBaseBrothersForLiturgistOffice } from "./ApiConnection";
import { BaseBrotherLiturgist } from './Brother'

export const DeanOffice = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrotherLiturgist> | null>()

    useEffect(() => {
        const getData = async() => {
            const brothers = await getBaseBrothersForLiturgistOffice()
            setBrothers(brothers)
        }
        getData()
    }, [])

    return (
        <div>
            <h2 className="header-frame">Wyznaczanie oficjów dziekańskich</h2>
            <div className="table-center">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Imię</th>
                            <th>Nazwisko</th>
                            <th>PR</th>
                            <th>SR</th>
                            <th>KO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brothers?.map((brother:BaseBrotherLiturgist, index) => 
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck id={index.toString() + "PR"} /></td>
                            <td><FormCheck id={index.toString() + "SR"} /></td>
                            <td><FormCheck id={index.toString() + "KO"} /></td>
                        </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}