import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { webAPIUrl } from "../AppSettings";
import {AddingBrother} from "./Brother";

export const EditBrothers = () => {

    const [brothers, setBrothers] = useState<Array<AddingBrother | null>>();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [deletetingBrotherName, setDeletingName] = useState("")
    const [deletetingBrotherSurname, setDeletingSurname] = useState("")
    const [deletingBrotherId, setDeletingId] = useState(0);
    const [deletingCount, setDeletingCount] = useState(0)


    useEffect(() => {
        async function getBrothersFromDB() {
            let response = await fetch(`${webAPIUrl}/brothers`);
            let result : Array<AddingBrother> = await response.json();
            setBrothers(result);
        }
        getBrothersFromDB()
    }, [deletingCount])

    const confirmDeleteBrother = (id:any, name:any, surname:any) => {
        setDeletingName(name)
        setDeletingSurname(surname)
        setDeletingId(id)
        handleShow()
    }

    const handleDeleteBrother = () => {
        fetch(`${webAPIUrl}/brothers/${deletingBrotherId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(deletingBrotherId)
        })
        .then(response => response.json())
        .then(data => {
            handleClose()
            console.log(data)
            setDeletingCount(deletingCount+1)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <h1>Edycja braci</h1>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Usuwanie brata</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Jesteś pewien, że chesz usunąć następującego brata: <br />
                    {deletetingBrotherName} {deletetingBrotherSurname}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Zamknij
                </Button>
                <Button variant="primary"onClick={(e) => handleDeleteBrother()}>Usuń</Button>
                </Modal.Footer>
            </Modal>

            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Lp</th>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Edytuj</th>
                        <th>Usuń</th>
                     </tr>
                </thead>
                <tbody>
                    {brothers?.map((brother, index) => 
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{brother?.name}</td>
                            <td>{brother?.surname}</td>
                            <td><Button variant="warning">Edytuj</Button></td>
                            <td><Button variant="danger" onClick={(e) => confirmDeleteBrother(brother?.id, brother?.name, brother?.surname)}>Usuń</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}