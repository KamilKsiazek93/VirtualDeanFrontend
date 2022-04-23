import React, {useEffect, useState} from "react";
import { Button, FormCheck, Table } from "react-bootstrap";
import { getBaseBrothersForLiturgistOffice } from "./ApiConnection";
import { BaseBrother } from "./Brother";

export const LiturgistOffice = () => {

    const [brothers, setBrothers] = useState<Array<BaseBrother> | null>();
    const [message, setMessage] = useState<string>()

    useEffect(() => {
        async function getData() {
            const brothers = await getBaseBrothersForLiturgistOffice();
            setBrothers(brothers)
        }
        getData()
    }, [])

    return (
        <div>
            <h2 className="header-frame">Wyznaczanie oficjów liturgicznych</h2>
            <div className="message-body">{message}</div>
            <div className="table-center">
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>Lp</th>
                            <th>Imię</th>
                            <th>Naziwsko</th>
                            <th>MO</th>
                            <th>MK</th>
                            <th>MŚ</th>
                            <th>KR</th>
                            <th>Tur</th>
                            <th>Suc1</th>
                            <th>Suc2</th>
                            <th>Resp1</th>
                            <th>Resp2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brothers?.map((brother:BaseBrother, index) => 
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{brother.name}</td>
                            <td>{brother.surname}</td>
                            <td><FormCheck /> </td>
                            <td><FormCheck /> </td>
                            <td><FormCheck /> </td>
                            <td><FormCheck /> </td>
                            <td><FormCheck /> </td>
                            <td><FormCheck /> </td>
                            <td><FormCheck /> </td>
                            <td><FormCheck /> </td>
                            <td><FormCheck /> </td>
                        </tr>
                        )}
                    </tbody>
                </Table>
                <Button className="button-center" variant="success">Dodaj oficja</Button>
            </div>
        </div>
    )
}